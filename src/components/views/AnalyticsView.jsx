import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MetricCard from '../ui/MetricCard';
import { TrendingUp, Target, Hourglass, Users, Star, Loader2 } from 'lucide-react';
// Note: We no longer import jobPostings here; we will fetch all necessary data dynamically.

const AnalyticsView = () => {
    // --- State for API Data ---
    const [analyticsData, setAnalyticsData] = useState({ 
        kpis: [], 
        viewsData: [], 
        funnelData: [],
        jobComparison: []
    });
    const [loading, setLoading] = useState(true);

    // --- Data Fetching ---
    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                // NOTE: Replace this endpoint with the actual backend analytics endpoint
                const response = await axios.get('/api/analytics/reports'); 
                setAnalyticsData(response.data); 
            } catch (error) {
                console.error("Error fetching analytics data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalyticsData();
    }, []);

    // --- Fallback/Rendering Logic ---
    // Providing simulated data fallbacks for charts in case the API returns empty arrays
    const viewsData = analyticsData.viewsData && analyticsData.viewsData.length > 0 ? analyticsData.viewsData : [100, 150, 120, 200, 180, 250, 220]; 
    const funnelData = analyticsData.funnelData && analyticsData.funnelData.length > 0 ? analyticsData.funnelData.map(d => d.count) : [100, 75, 50, 10]; 
    const funnelLabels = analyticsData.funnelData && analyticsData.funnelData.length > 0 ? analyticsData.funnelData.map(d => d.stage) : ['Applied', 'Screening', 'Interview', 'Offer'];

    const renderFunnelBars = () => {
        const total = funnelData[0] || 100;
        const colors = ['bg-blue-500', 'bg-purple-500', 'bg-teal-500', 'bg-green-500'];
        return funnelData.map((count, index) => (
            <div key={index} className="flex items-center mb-4">
                <div className="w-1/4 text-sm font-medium text-gray-700">{funnelLabels[index]} ({count})</div>
                <div className="w-3/4 flex items-center h-8">
                    <div 
                        className={`h-full rounded-l-md transition-all duration-500 ${colors[index]}`}
                        style={{ width: `${(count / total) * 100}%` }}
                    ></div>
                    <span className="ml-2 text-sm font-bold text-gray-800">{Math.round((count / total) * 100)}%</span>
                </div>
            </div>
        ));
    };

    const renderAreaChart = () => {
        const maxViews = Math.max(...viewsData);
        return (
            <div className="flex items-end h-40 border-b border-l border-gray-300 relative">
                {viewsData.map((views, index) => (
                    <div 
                        key={index}
                        className="flex-1 h-full flex items-end justify-center px-1"
                    >
                        <div 
                            className="w-full bg-purple-400 opacity-70 transition-all duration-300 rounded-t-sm"
                            style={{ height: `${(views / maxViews) * 95}%` }}
                        ></div>
                    </div>
                ))}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-4xl font-extrabold opacity-10 pointer-events-none">
                    VIEWS
                </div>
            </div>
        );
    };

    if (loading) {
        return <div className="text-center py-20"><Loader2 className="animate-spin h-8 w-8 mx-auto text-purple-600" /> <p className="mt-2 text-gray-500">Compiling Analytics...</p></div>
    }

    return (
        <div className="py-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Recruitment Analytics</h1>
            <p className="text-lg text-gray-600 mb-6">Strategic insights into job performance and candidate flow.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {analyticsData.kpis && analyticsData.kpis.map((kpi, index) => (
                    <MetricCard key={index} {...kpi} />
                ))}
                {/* Fallback mock KPIs for visual confirmation if API response is empty/slow */}
                {analyticsData.kpis.length === 0 && (
                    <>
                        <MetricCard title="Conversion Rate" value="15.2%" change="+2% vs Avg" changeColor="text-green-600" icon={Target} iconBg="bg-blue-100/70" iconColor="text-blue-600"/>
                        <MetricCard title="Avg Time-to-Hire" value="35 Days" change="-5 Days" changeColor="text-green-600" icon={Hourglass} iconBg="bg-orange-100/70" iconColor="text-orange-600"/>
                        <MetricCard title="Applicant Quality" value="8.2/10" change="Steady" changeColor="text-gray-500" icon={Star} iconBg="bg-yellow-100/70" iconColor="text-yellow-600"/>
                    </>
                )}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-3 text-purple-500" /> Job Views Trend (Last 7 Days)
                    </h2>
                    {renderAreaChart()}
                    <div className="flex justify-between text-xs text-gray-500 pt-2">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4 flex items-center">
                        <Users className="h-5 w-5 mr-3 text-purple-500" /> Recruitment Funnel (Job 1)
                    </h2>
                    {renderFunnelBars()}
                    <p className="text-sm text-gray-500 pt-4">
                        <span className="font-bold text-purple-600">Note:</span> Funnel data is live-fetched or simulated.
                    </p>
                </div>

            </div>

            <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">Job Performance Comparison</h2>
                <div className="overflow-x-auto">
                    {/* Placeholder table for demonstration */}
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hire Rate</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-sm text-gray-700">
                            {analyticsData.jobComparison.length > 0 ? (
                                analyticsData.jobComparison.map(job => (
                                    <tr key={job.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium">{job.title}</td>
                                        <td className="px-6 py-4">{job.views}</td>
                                        <td className="px-6 py-4">{job.applicants}</td>
                                        <td className="px-6 py-4 text-green-600 font-semibold">{job.hireRate}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="4" className="text-center py-4 text-gray-500">No comparison data available from API.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsView;