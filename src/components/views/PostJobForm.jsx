import React, { useState } from 'react';
import axios from 'axios'; // <-- NEW IMPORT
import { ArrowLeft, FileText, MapPin, DollarSign, Loader2 } from 'lucide-react';

const hourOptions = [12, 24, 36, 48, 72]; 
const dayOptions = [1, 2, 3, 4, 5, 6, 7]; 

const PostJobForm = ({ setCurrentView }) => {
  const [isPosting, setIsPosting] = useState(false);
  const [responseTimeType, setResponseTimeType] = useState('days'); 
  const [responseTimeValue, setResponseTimeValue] = useState(1);
  const [formData, setFormData] = useState({}); // State to capture all form data

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPosting(true);
    
    const finalData = {
        ...formData,
        maxResponseTime: `${responseTimeValue} ${responseTimeType}`,
        // Note: The actual payload structure may need adjustment based on backend specs.
    };

    try {
        // --- API POST REQUEST ---
        const response = await axios.post('/api/employer/jobs/create', finalData); 
        console.log('Job Posted successfully:', response.data);
        alert("Job Posted Successfully!"); 
        setCurrentView('dashboard');
    } catch (error) {
        console.error("Error posting job:", error.response || error);
        alert("Failed to post job. Check console for details.");
    } finally {
        setIsPosting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <button 
        onClick={() => setCurrentView('dashboard')} 
        className="flex items-center text-purple-600 hover:text-purple-800 transition-colors mb-6 text-sm font-medium"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
      <p className="text-lg text-gray-600 mb-8">Fill in the details below to create a new listing for IamHR.</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4 flex items-center"><FileText className="h-5 w-5 mr-3 text-purple-500" /> Job Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
              <input type="text" id="title" required placeholder="e.g., Senior Frontend Developer" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
              <input type="text" id="companyName" required placeholder="e.g., Acme Corp" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
              <input type="text" id="department" required placeholder="e.g., Engineering" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" onChange={handleChange} />
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description (Rich Text)</label>
            <textarea id="description" required rows="6" placeholder="Describe the role, responsibilities, and company culture." className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" onChange={handleChange}></textarea>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4 flex items-center"><MapPin className="h-5 w-5 mr-3 text-purple-500" /> Location, Schedule & Level</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6"> 
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <input type="text" id="location" required placeholder="e.g., Bengaluru, India" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Job Type</label>
              <select id="type" required className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" onChange={handleChange}>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>
            <div>
              <label htmlFor="workplace" className="block text-sm font-medium text-gray-700">Workplace</label>
              <select id="workplace" required className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" onChange={handleChange}>
                <option>Remote</option>
                <option>On-site</option>
                <option>Hybrid</option>
              </select>
            </div>
            <div>
              <label htmlFor="jobLevel" className="block text-sm font-medium text-gray-700">Job Level</label>
              <select id="jobLevel" required className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" onChange={handleChange}>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Executive</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="responseTimeValue" className="block text-sm font-medium text-gray-700">Max Response Time</label>
              <div className="flex space-x-1 mt-1">
                <select 
                  id="responseTimeValue"
                  required 
                  value={responseTimeValue}
                  onChange={(e) => setResponseTimeValue(parseInt(e.target.value))}
                  className="block w-2/3 rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  aria-label="Response Time Value"
                >
                  {responseTimeType === 'hours' ? (
                    hourOptions.map(i => (
                      <option key={i} value={i}>{i}</option>
                    ))
                  ) : (
                    dayOptions.map(i => (
                      <option key={i} value={i}>{i}</option>
                    ))
                  )}
                </select>
                
                <select 
                  id="responseTimeType"
                  required 
                  value={responseTimeType}
                  onChange={(e) => {
                    const newType = e.target.value;
                    setResponseTimeType(newType);
                    setResponseTimeValue(newType === 'hours' ? 24 : 1);
                  }}
                  className="block w-1/3 rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  aria-label="Response Time Unit"
                >
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4 flex items-center"><DollarSign className="h-5 w-5 mr-3 text-purple-500" /> Compensation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="minSalary" className="block text-sm font-medium text-gray-700">Minimum Salary (INR/Year)</label>
              <input type="number" id="minSalary" placeholder="e.g., 10,00,000" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="maxSalary" className="block text-sm font-medium text-gray-700">Maximum Salary (INR/Year)</label>
              <input type="number" id="maxSalary" placeholder="e.g., 15,00,000" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button 
            type="button" 
            className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
          >
            Save Draft
          </button>
          <button 
            type="submit" 
            disabled={isPosting}
            className={`flex items-center px-8 py-2 rounded-full text-white font-semibold transition-colors ${
              isPosting ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 shadow-md'
            }`}
          >
            {isPosting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {isPosting ? 'Publishing...' : 'Publish Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJobForm;