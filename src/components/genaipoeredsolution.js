import React, { useState, useEffect } from "react";

const GenAIPoweredSolution = ({ suppliers }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [highRiskSuppliers, setHighRiskSuppliers] = useState([]);

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

    // Handle opening the popup and calling ChatGPT
    const openPopup = async (supplierName) => {
        const url = 'https://api.openai.com/v1/chat/completions';
        const body = {
            model: "gpt-3.5-turbo", // or "gpt-4" if you want to use GPT-4
            messages: [{ role: 'user', content: "Top 5 alternate suppliers for " + supplierName + " with supplier name, contact numbdetails and country name.These three are mandatory fields" }],
            max_tokens: 150,
        };

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': '', // Replace with your OpenAI API key
                },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            const suppliersList = parseSuppliers(data.choices[0].message.content);

            setHighRiskSuppliers(suppliersList);
            setIsPopupOpen(true);

        } catch {

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
            suppliers.push(supplier);
        });

        return suppliers;
    };


    return (
        <>


            <table className="min-w-full bg-white border">
                <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                        <th className="border-b-black px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">Part Name</th>
                        <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">Supplier Name</th>
                        <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">OverAll Risk</th>
                        <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">Alternate Supplier</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>

            {isPopupOpen && (
                <div className="popup fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Top 5 Alternate  Suppliers</h2>
                            <button onClick={closePopup} className="text-gray-500 hover:text-gray-700">
                                Close
                            </button>
                        </div>
                        {!Array.isArray(highRiskSuppliers) || highRiskSuppliers.length === 0 ? (
                            <p>No high-risk suppliers found.</p>
                        ) : (
                            <ul className="space-y-4">
                                {highRiskSuppliers.map((supplier, index) => (
                                    <li key={index} className="border-b pb-4">
                                        <strong>Supplier Name:</strong> {supplier.supplierName || "N/A"} <br />
                                        <strong>Contact:</strong> {supplier.contact || "N/A"} <br />
                                        <strong>Country:</strong> {supplier.country || "N/A"}
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
