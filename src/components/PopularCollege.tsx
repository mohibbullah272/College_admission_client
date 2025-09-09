import type { College } from "@/pages/Colleges";
import { collegesAPI } from "@/utils/api";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";


import { Link } from "react-router"; 
import { Button } from "./ui/button";
import { renderStars } from '../pages/Colleges';

const PopularCollege = () => {
    const [colleges, setColleges] = useState<College[]>([]);
    const [loading, setLoading] = useState(true);

    const limit = 3;

    useEffect(() => {
        fetchCollege();
    }, []); // Added empty dependency array

    const fetchCollege = async () => {
        setLoading(true);
        try {
            // Fixed API call to use object parameter
            const response = await collegesAPI.getAll({ limit });
            setColleges(response.data.data);
        } catch (error) {
            console.error('Failed to fetch college:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center">
        <h3 className="text-4xl text-center my-10">Popular <span className="text-red-500">Colleges</span></h3>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <>
                    {colleges.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No colleges found.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {colleges.map((college) => (
                                <Card key={college._id} className="">
                                    <div className="h-48 ">
                                        <img
                                            loading='lazy'
                                            src={college.image || 'https://via.placeholder.com/400x300'}
                                            alt={college.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <CardHeader>
                                        <CardTitle>{college.name}</CardTitle>
                                        <CardDescription className="flex items-center">
                                            <span className="mr-2">Rating:</span>
                                            <div className="flex">
                                                {renderStars(Math.floor(college.rating))}
                                            </div>
                                            <span className="ml-2">({college.rating})</span>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-600 mb-2">
                                            <span className="font-medium">Admission Date:</span>{' '}
                                            {new Date(college.admissionDate).toLocaleDateString()}
                                        </p>
                                        <p className="text-sm text-gray-600 mb-2">
                                            <span className="font-medium">Research Count:</span>{' '}
                                            {college.researchCount}
                                        </p>
                                        <div className="text-sm text-gray-600">
                                            <span className="font-medium">Events:</span>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {college.events.slice(0, 3).map((event, index) => (
                                                    <span key={index} className="bg-gray-100 px-2 py-1 rounded text-xs">
                                                        {event}
                                                    </span>
                                                ))}
                                                {college.events.length > 3 && (
                                                    <span className="text-xs">+{college.events.length - 3} more</span>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                   <Link to={`/colleges/${college._id}`} className="w-full">
                                    <Button className="w-full">View Details</Button>
                                </Link>
                                   
                                     
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PopularCollege;