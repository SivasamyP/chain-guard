import React, { useState } from 'react';

const PredictiveAnalysis = () => {
    const [formData, setFormData] = useState({
        Credit_Utilization: 0.95,
        Payment_Delays: 180,
        Profit_Margin: -0.05,
        Revenue: 100000,
        Outstanding_Loans: 80000,
        Years_in_Business: 2,
        Supplier_Risk_Rating: 'C',
        Industry_Default_Rate: 0.20,
        Regional_Economic_Growth: -0.03,
        Location: 'West',
        Industry: 'Textiles',
    });
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
    const [predictionResult, setPredictionResult] = useState(null); // State for modal result
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus({ type: 'loading', message: 'Submitting...' });

        try {
            const response = await fetch('https://6997-35-231-29-207.ngrok-free.app/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                setSubmitStatus({ type: 'success', message: 'Data submitted successfully!' });

                // Set the result to trigger the modal
                setPredictionResult(result);
                setIsModalOpen(true);
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            setSubmitStatus({ type: 'error', message: 'Failed to submit data. Please try again.' });
        }
    };

    const FormField = ({ label, name, type = 'number', step, required = true }) => (
        <div className="mb-4">
            <label htmlFor={name} className="block mb-2 text-sm font-medium">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                step={step}
                value={formData[name]}
                onChange={handleChange}
                required={required}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
    const handleClose = () => {
        setIsModalOpen(false);
        setSubmitStatus({ type: '', message: '' });
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-center mb-6">Risk Analysis Form</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Credit Utilization (%)" name="Credit_Utilization" step="0.01" />
                    <FormField label="Payment Delays (days)" name="Payment_Delays" />
                    <FormField label="Profit Margin (%)" name="Profit_Margin" step="0.01" />
                    <FormField label="Revenue ($)" name="Revenue" />
                    <FormField label="Outstanding Loans ($)" name="Outstanding_Loans" />
                    <FormField label="Years in Business" name="Years_in_Business" />
                    <div className="mb-4">
                        <label htmlFor="Supplier_Risk_Rating" className="block mb-2 text-sm font-medium">
                            Supplier Risk Rating
                        </label>
                        <select
                            id="Supplier_Risk_Rating"
                            name="Supplier_Risk_Rating"
                            value={formData.Supplier_Risk_Rating}
                            onChange={handleSelectChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select rating</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                        </select>
                    </div>
                    <FormField label="Industry Default Rate (%)" name="Industry_Default_Rate" step="0.01" />
                    <FormField label="Regional Economic Growth (%)" name="Regional_Economic_Growth" step="0.01" />
                    <FormField label="Location" name="Location" type="text" />
                    <FormField label="Industry" name="Industry" type="text" />
                </div>

                {submitStatus.message && (
                    <div
                        className={`mb-6 p-4 rounded-md ${
                            submitStatus.type === 'error'
                                ? 'bg-red-50 text-red-700'
                                : submitStatus.type === 'success'
                                ? 'bg-green-50 text-green-700'
                                : 'bg-blue-50 text-blue-700'
                        }`}
                    >
                        {submitStatus.message}
                    </div>
                )}

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-full md:w-auto px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        disabled={submitStatus.type === 'loading'}
                    >
                        {submitStatus.type === 'loading' ? 'Submitting...' : 'Submit Analysis'}
                    </button>
                </div>
            </form>

            {/* Full-Screen Loader */}
            {submitStatus.type === 'loading' && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <div
                            style={{
                                border: '8px solid #f3f3f3', /* Light gray */
                                borderTop: '8px solid #3498db', /* Blue */
                                borderRadius: '50%',
                                width: '50px',
                                height: '50px',
                                animation: 'spin 2s linear infinite',
                            }}
                        ></div>
                        <p className="mt-4 text-xl font-semibold text-gray-700">Submitting your data...</p>
                    </div>
                </div>
            )}

            {/* Modal for displaying the result */}
            {isModalOpen && predictionResult && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h3 className="text-xl font-bold mb-4">Default Prediction Result</h3>
                        <p>
                            <strong>Default Prediction:</strong>
                            <span
                                className={`inline-block py-1 px-4 rounded-full text-white font-semibold ml-2 
      ${predictionResult.default_prediction === 0 ? 'bg-green-500' : 'bg-red-500'}`}
                            >
                                {predictionResult.default_prediction === 0 ? 'No' : 'Yes'}
                            </span>
                        </p>
                        <p>
                            <strong>Default Probability:</strong> {predictionResult.default_probability.toFixed(3)}
                        </p>

                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleClose}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PredictiveAnalysis;
