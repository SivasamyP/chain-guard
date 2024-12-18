import axios from "axios";
import React, { useState } from "react";
import RiskDetails from '../mockdata/riskdetails.json';
import { FiX } from "react-icons/fi";

const GenAIPoweredSolution = ({ suppliers }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [highRiskSuppliers, setHighRiskSuppliers] = useState([]);

    const [news, setNews] = useState([]);
    const [sentimentalRisk, sentSentimentalRisk] = useState("");
    const [isNewsPopUpOpen, setIsNewsPopUpOpen] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);

    const getRiskColor = (riskValue) => {
        switch (riskValue) {
            case 'High':
                return 'bg-red-500 text-black';
            case 'Medium':
                return 'bg-yellow-500 text-black';
            case 'Low':
                return 'bg-green-500 text-black';
            default:
                return 'bg-gray-300 text-gray-800';
        }

    };
    const getSentimentColor = (riskValue) => {
        switch (riskValue) {
            case 'Negative':
                return 'bg-red-500 text-black';
            
            case 'Positive':
                return 'bg-green-500 text-black';
            default:
                return 'bg-gray-300 text-gray-800';
        }

    };

    // Handle opening the popup and calling ChatGPT
    const openPopup = async (supplierName) => {
        setIsPageLoading(true);
        const url = 'https://api.openai.com/v1/chat/completions';
        const body = {
            model: "gpt-3.5-turbo",
            messages: [{ role: 'user', content: "Top 5 alternate suppliers for " + supplierName + " with supplier name, contact numbdetails and country name.These three are mandatory fields" }],
            max_tokens: 150,
        };

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': '',
                },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            const suppliersList = parseSuppliers(data.choices[0].message.content);

            setHighRiskSuppliers(suppliersList);
            setIsPopupOpen(true);

        } catch {

        } finally {
            setIsPageLoading(false);

        }
    }
    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const parseSuppliers = (responseContent) => {
        const suppliers = [];

        const supplierEntries = responseContent
            .split("\n\n")
            .flatMap(entry => entry.split("/n /n"))
            .filter(entry => entry.trim());

        supplierEntries.forEach(entry => {
            const lines = entry.split("\n").map(line => line.trim());
            const supplier = {};

            if (lines[0]) {
                const [number, name] = lines[0].split('. ', 2);
                supplier.supplierName = name.replace("Supplier:", "").trim() || "N/A";
            }
            lines.forEach(line => {
                if (line.startsWith("- Contact:") || line.startsWith("Contact:") || line.startsWith("Contact details:")) {
                    supplier.contact = line.replace("- Contact:", "").replace("Contact:", "").replace("Contact details:", "").trim();
                }
                if (line.startsWith("- Country:") || line.startsWith("Country:") || line.startsWith("Country name:") || line.startsWith("Location:")) {
                    supplier.country = line.replace("- Country:", "").replace("Country:", "").replace("Country name:", "").replace("Location:", "").trim();
                }
            });

            if (supplier.country) {
                const countryKey = supplier.country.toLowerCase();

                const riskDetail = RiskDetails.data.find(
                    risk => risk.supplierCountry.toLowerCase() === countryKey
                );

                if (riskDetail) {
                    supplier.countryRisk = riskDetail.countryRisk,
                        supplier.naturalHazardRisk = riskDetail.naturalHazardRisk,
                        supplier.financialRisk = riskDetail.financialRisk
                }



            }
            suppliers.push(supplier);
        });

        return suppliers;
    };

    const newsPopUp = async (supplierName) => {
        fetchNews(supplierName);
    }

    const fetchNews = async (supplierName) => {
        setIsPageLoading(true);

        try {
            const newsApiKey = "df4e9527b09d45539ac2928784d51b61"; // Replace with your News API key
            const query = `"${supplierName}"`;
            const response = await axios.get(
                `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=5&apiKey=${newsApiKey}`
            );
            const articles = response.data.articles;
            const filteredArticles = articles.filter(article => article.title !== "[Removed]");
            if (filteredArticles && filteredArticles.length > 0) {
              analyzeRisk(filteredArticles, supplierName);
    
            } else {
                setIsNewsPopUpOpen(true);

                setIsPageLoading(false);
    
            }

           
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    const analyzeRisk = async (articles, supplierName) => {
        try {
            const textToAnalyze = articles.map((article) => article.title + ". " + article.description).join("\n");

            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo", // Use "gpt-4" if you have access
                    messages: [
                        {
                            role: "user",
                            content: `Analyze the following news articles about ${supplierName} and categorize the sentiment as Positive, Negative, or Neutral:\n\n${textToAnalyze}. Response format should be list of object`,
                        },
                    ],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': '',
                    },
                }
            );

            const responseText = response.data.choices[0].message.content.trim();
            const riskMatch = responseText.match(/\b(Positive|Negative|Neutral)\b/gi);


            if (riskMatch) {
                const sentimentScores = { Positive: 1, Negative: -1, Neutral: 0 };
                const totalScore = riskMatch.reduce((sum, sentiment) => {
                    return sum + (sentimentScores[sentiment] || 0);
                }, 0);

                let overallSentiment = "Neutral";
                if (totalScore > 0) overallSentiment = "Positive";
                if (totalScore < 0) overallSentiment = "Negative";
                const newsDetails = articles.map((item, index) => ({
                    ...item,
                    sentiment: riskMatch[index], // Replace with your logic for determining sentiment
                }));
                setNews(newsDetails);
                sentSentimentalRisk(overallSentiment);
            } else {
                console.log("Risk level not found in the response.");
            }
            setIsNewsPopUpOpen(true);
        } catch (error) {
            console.error("Error analyzing risk:", error);
        } finally {
            setIsPageLoading(false);

        }
    };

    const newsPopupClose = () => {
        setIsNewsPopUpOpen(false);
    }

    const FullPageLoader = () => (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            <span className="text-white mt-4 text-lg font-semibold absolute">Loading...</span>
        </div>
    );

    return (
        <>
            {isPageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
                    {/* Loader */}
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            {/* {isPageLoading && <FullPageLoader />} */}

            <table className="min-w-full bg-white border">
                <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                        <th className="border-b-black px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">Part Name</th>
                        <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">Supplier Name</th>
                        <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">OverAll Risk</th>
                        <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">Alternate Supplier</th>
                        <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">Top News</th>

                    </tr>
                </thead>
                <tbody className="divide-y">
                    {suppliers.map((supplier, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2 whitespace-nowrap">{supplier.partName}</td>
                            <td className="border px-4 py-2 whitespace-nowrap">{supplier.supplierName}</td>
                            <td className="border px-4 py-2 whitespace-nowrap">
                                <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.overAllRisk)}`}>
                                    {supplier.overAllRisk}
                                </span>
                            </td>

                            <td
                                className="border px-4 py-2 text-blue-600 cursor-pointer"
                                onClick={() => openPopup(supplier.partName)}
                            >
                                Alternate Supplier
                            </td>
                            <td
                                className="border px-4 py-2 text-blue-600 cursor-pointer"
                                onClick={() => newsPopUp(supplier.supplierName)}
                            >
                                Top News
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isNewsPopUpOpen && (
                <div className="popup fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto relative">
                        <div className="flex justify-between items-center mb-2">
                           {sentimentalRisk && <h2 className="text-xl font-semibold">
                                Sentiment Analysis:{" "}
                                <span
                                    className={`px-4 py-2 rounded-full text-black ${getSentimentColor(
                                        sentimentalRisk
                                    )}`}
                                >
                                    {sentimentalRisk}
                                </span>
                            </h2>} 
                            <FiX
                                onClick={newsPopupClose}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer text-2xl"
                            />
                        </div>

                        {sentimentalRisk && <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-semibold">Top News about  Supplier</h2>


                        </div>}

                        {!Array.isArray(news) || news.length === 0 ? (
                            <p>No news found about the supplier.</p>
                        ) : (
                            <ul className="space-y-4">
                                {news.map((article, index) => (
                                    <li key={index} className="border-b pb-4">
                                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600 ml-4"
                                        >
                                            <strong>
                                                {article.title}

                                            </strong>
                                            <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ml-2 ${getSentimentColor(article.sentiment)}`}>
                                                {article.sentiment}
                                            </span>


                                        </a>
                                        <div className="flex items-center w-full">
                                            <div className="w-1/4 p-3">
                                                <img
                                                    src={article.urlToImage}
                                                    alt="Descriptive text"
                                                    className="w-full h-32 object-cover rounded-lg shadow-md"
                                                />
                                            </div>
                                            <div className="w-1/2 p-1 flex items-center">
                                                <p className="text-sm text-gray-700">{article.description}</p>
                                            </div>
                                        </div>
                                        <div className="my-2"></div> {/* Adding space between articles */}
                                    </li>
                                ))}

                            </ul>
                        )}
                    </div>
                </div>
            )}

            {isPopupOpen && (
                <div className="popup fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto relative">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Top 5 Alternate Suppliers</h2>
                            <FiX
                                onClick={closePopup}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer text-2xl"
                            />
                        </div>

                        {/* Content */}
                        {!Array.isArray(highRiskSuppliers) || highRiskSuppliers.length === 0 ? (
                            <p>No high-risk suppliers found.</p>
                        ) : (
                            <ul className="space-y-4">
                                {highRiskSuppliers.map((supplier, index) => (
                                    <li key={index} className="border-b pb-4">
                                        <strong>Supplier Name:</strong> {supplier.supplierName || "N/A"} <br />
                                        <strong>Contact:</strong> {supplier.contact || "N/A"} <br />
                                        <strong>Country:</strong> {supplier.country || "N/A"} <br />
                                        <strong>Country Risk:</strong>{" "}
                                        <span
                                            className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.countryRisk)}`}
                                        >
                                            {supplier.countryRisk || "N/A"}
                                        </span>
                                        <br />

                                        <strong>Natural Hazard Risk:</strong>{" "}
                                        <span
                                            className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.naturalHazardRisk)}`}
                                        >
                                            {supplier.naturalHazardRisk || "N/A"}
                                        </span>
                                        <br />

                                        <strong>Financial Risk:</strong>{" "}
                                        <span
                                            className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.financialRisk)}`}
                                        >
                                            {supplier.financialRisk || "N/A"}
                                        </span>
                                        <div className="my-2"></div> {/* Adding space between suppliers */}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

            )}

        </>
    );
};

export default GenAIPoweredSolution;
