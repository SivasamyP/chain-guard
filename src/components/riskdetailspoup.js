import React, { useState, useEffect } from "react";
import supplierData from '../mockdata/masterdata.json';
import axios from "axios";
import { FiX } from "react-icons/fi";



const RiskDetailsPopup = ({ supplier, closePopup }) => {
  const [news, setNews] = useState([]);
  const [sentimentalRisk, setSentimentalRisk] = useState("");
  const [loading, setLoading] = useState(false); // Loader state
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
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

  useEffect(() => {

    const fetchNews = async () => {
      try {
        setLoading(true); // Start loader

        setSubmitStatus({ type: 'loading', message: 'Submitting...' });

        const newsApiKey = ""; // Replace with your News API key
        const query = `"${supplier.supplierName}"`;
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=5&apiKey=${newsApiKey}`
        );

        const articles = response.data.articles;
        const filteredArticles = articles.filter(article => article.title !== "[Removed]");
        if (filteredArticles && filteredArticles.length > 0) {
          analyzeRisk(filteredArticles, supplier.supplierName);

        } else {
          setLoading(false);

        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();

  }, [supplier]);

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
        setSentimentalRisk(overallSentiment);
      } else {
        console.log("Risk level not found in the response.");
      }
    } catch (error) {
      console.error("Error analyzing risk:", error);
    } finally {
      setLoading(false); // End loader
    }
  };

  if (!supplier) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
          {/* Loader */}
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto grid grid-cols-[2fr_1fr] gap-4 relative">
        {/* <button
    onClick={closePopup}
    className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
  >
    Close
  </button> */}
        <FiX
          onClick={closePopup}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer text-2xl"
        />
        <div> <span className="text-xl font-bold mb-4 pr-5">Supplier Risk Details - {supplier.supplierName}</span>

          <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full pl-3 ${getRiskColor(supplier.overAllRisk)}`}>
            {supplier.overAllRisk}
          </span>

          <br />
          <br />

          <h3 className="text-lg font-semibold mb-2">Country Risk</h3>
          <div className="w-full text-left text-sm">
            <div>
              {Object.entries(supplier.countryRisk || {}).map(([key, value]) => (
                <div key={key}>
                  {key === 'overAll' && <>
                    <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                    <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.countryRisk.overAllInd)}`}>
                      {supplier.countryRisk.overAllInd}
                    </span>
                    <div>{supplierData.definitions.country.overall}</div>
                  </>
                  }
                  {key === 'demographicPressures' &&
                    <>
                      <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                      <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.countryRisk.demographicPressuresInd)}`}>
                        {supplier.countryRisk.demographicPressuresInd}
                      </span>
                      <div>{supplierData.definitions.country.demographicPressures}</div>
                    </>
                  }
                  {key === 'economy' &&
                    <>
                      <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                      <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.countryRisk.economyInd)}`}>
                        {supplier.countryRisk.economyInd}
                      </span>
                      <div>{supplierData.definitions.country.economy}</div>
                    </>
                  }
                  {key === 'stateLegitimacy' &&
                    <>
                      <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                      <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.countryRisk.stateLegitimacyInd)}`}>
                        {supplier.countryRisk.stateLegitimacyInd}
                      </span>
                      <div>{supplierData.definitions.country.stateLegitimacy}</div>
                    </>
                  }
                  {key === 'securityAppratus' &&
                    <>
                      <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                      <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.countryRisk.securityAppratusInd)}`}>
                        {supplier.countryRisk.securityAppratusInd}
                      </span>
                      <div>{supplierData.definitions.country.securityAppratus}</div>
                    </>
                  }
                  {key === 'externalIntervention' &&
                    <>
                      <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                      <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full${getRiskColor(supplier.countryRisk.externalInterventionInd)}`}>
                        {supplier.countryRisk.externalInterventionInd}
                      </span>
                      <div>{supplierData.definitions.country.externalIntervention}</div>
                    </>
                  }
                  {key === 'economicInequality' &&
                    <>
                      <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                      <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.countryRisk.economicInequalityInd)}`}>
                        {supplier.countryRisk.economicInequalityInd}
                      </span>
                      <div>{supplierData.definitions.country.economicInequality}</div>
                    </>
                  }
                  {key === 'refugeeCrisis' &&
                    <>
                      <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                      <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.countryRisk.refugeeCrisisInd)}`}>
                        {supplier.countryRisk.refugeeCrisisInd}
                      </span>
                      <div>{supplierData.definitions.country.refugeeCrisis}</div>
                    </>
                  }
                  <br />

                </div>
              ))}
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-2">Natural Hazard Risk</h3>
          <div className="w-full text-left text-sm">
            <div>
              {Object.entries(supplier.naturalHazardRisk || {}).map(([key, value]) => (
                <div key={key}>
                  {key === 'overAll' && <>
                    <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                    <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.naturalHazardRisk.overAllInd)}`}>
                      {supplier.naturalHazardRisk.overAllInd}
                    </span>
                    <div>{supplierData.definitions.naturalHazard.overall}</div>
                  </>
                  }
                  {key === 'earthquakes' &&
                    <>
                      <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                      <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.naturalHazardRisk.earthquakesInd)}`}>
                        {supplier.naturalHazardRisk.earthquakesInd}
                      </span>
                      <div>{supplierData.definitions.naturalHazard.earthquakes}</div>
                    </>
                  }
                  {key === 'tsunami' &&
                    <>
                      <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                      <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.naturalHazardRisk.tsunamiInd)}`}>
                        {supplier.naturalHazardRisk.tsunamiInd}
                      </span>
                      <div>{supplierData.definitions.naturalHazard.tsunami}</div>
                    </>
                  }
                  {key === 'coatalFlooding' &&
                    <>
                      <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                      <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.naturalHazardRisk.coatalFloodingInd)}`}>
                        {supplier.naturalHazardRisk.coatalFloodingInd}
                      </span>
                      <div>{supplierData.definitions.naturalHazard.coatalFlooding}</div>
                    </>
                  }
                  {key === 'cyclones' &&
                    <>
                      <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                      <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.naturalHazardRisk.cyclonesInd)}`}>
                        {supplier.naturalHazardRisk.cyclonesInd}
                      </span>
                      <div>{supplierData.definitions.naturalHazard.cyclones}</div>
                    </>
                  }
                  {key === 'draoughts' &&
                    <>
                      <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                      <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.naturalHazardRisk.draoughtsInd)}`}>
                        {supplier.naturalHazardRisk.draoughtsInd}
                      </span>
                      <div>{supplierData.definitions.naturalHazard.draoughts}</div>
                    </>
                  }
                  {key === 'seaLevelRise' &&
                    <>
                      <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                      <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.naturalHazardRisk.seaLevelRiseInd)}`}>
                        {supplier.naturalHazardRisk.seaLevelRiseInd}
                      </span>
                      <div>{supplierData.definitions.naturalHazard.seaLevelRise}</div>
                    </>
                  }

                  <br />

                </div>
              ))}
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-2">Financial Risk</h3>
          <div className="w-full text-left text-sm">
            <div>
              {Object.entries(supplier.financialRisk || {}).map(([key, value]) => (
                <div key={key}>
                  {key === 'overAll' && <>
                    <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                    <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.financialRisk.overAllInd)}`}>
                      {supplier.financialRisk.overAllInd}
                    </span>
                    <div>{supplierData.definitions.financial.overall}</div>
                  </>
                  }
                  {key === 'SSI' &&
                    <>
                      <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                      <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.financialRisk.SSIInd)}`}>
                        {supplier.financialRisk.SSIInd}
                      </span>
                      <div>{supplierData.definitions.financial.SSI}</div>
                    </>
                  }
                  {key === 'SER' &&
                    <>
                      <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                      <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.financialRisk.SERInd)}`}>
                        {supplier.financialRisk.SERInd}
                      </span>
                      <div>{supplierData.definitions.financial.SER}</div>
                    </>
                  }

                  <br />

                </div>
              ))}
            </div>
          </div>


          <h3 className="text-lg font-semibold mb-2">Operational Risk</h3>
          <div className="w-full text-left text-sm">
            <div>
              {Object.entries(supplier.operationalRisk || {}).map(([key, value]) => (
                <div key={key}>
                  {key === 'overAll' && <>
                    <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                    <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.operationalRisk.overAllInd)}`}>
                      {supplier.operationalRisk.overAllInd}
                    </span>
                    <div>{supplierData.definitions.operational.overall}</div>
                    <br />
                  </>
                  }
                  {key === 'deliveryDelays' &&
                    <>
                      <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                      <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.operationalRisk.deliveryDelaysInd)}`}>
                        {supplier.operationalRisk.deliveryDelaysInd}
                      </span>
                      <div>{supplierData.definitions.operational.deliveryDelays}</div>
                      <br />
                    </>

                  }
                  {key === 'qualityIssues' &&
                    <>
                      <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                      <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.operationalRisk.qualityIssuesInd)}`}>
                        {supplier.operationalRisk.qualityIssuesInd}
                      </span>
                      <div>{supplierData.definitions.operational.qualityIssues}</div>
                      <br />
                    </>
                  }
                </div>

              ))}
            </div>
          </div>
        </div>
        <div>
          <span className="text-xl font-bold mb-4 pr-5">Sentiment Analysis - {supplier.supplierName}</span>
          {sentimentalRisk && (
            <span
              className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full pl-3 ${getSentimentColor(sentimentalRisk)}`}
            >
              {sentimentalRisk}
            </span>
          )}

          {!Array.isArray(news) || news.length === 0 ? (
            <p>No news found about the supplier.</p>
          ) : (
            <ul className="space-y-4">
              {news.map((article, index) => (
                <li key={index} className="border-b pb-4">
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600"
                  >
                    <strong>
                      {article.title}

                    </strong>
                    <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ml-4 ${getSentimentColor(article.sentiment)}`}>
                      {article.sentiment}
                    </span>
                    <img
                      src={article.urlToImage}
                      alt="Descriptive text"
                      className="w-full h-auto rounded-lg shadow-md"
                    />

                  </a>
                  <p style={{ margin: "5px 0" }}>{article.description}</p>
                  <div className="my-2"></div> {/* Adding space between articles */}
                </li>
              ))}

            </ul>
          )}
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={closePopup}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default RiskDetailsPopup;
