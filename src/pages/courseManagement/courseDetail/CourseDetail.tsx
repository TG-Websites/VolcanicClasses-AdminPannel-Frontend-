// pages/CourseDetail.tsx
import { CollapsibleSection } from "./components/CollapsibleSection";
import {
    FiFile, FiImage, FiFileText, FiAward, FiFilm, FiClipboard, FiBarChart2, FiUsers, FiBriefcase,
    FiStar, FiDownload, FiBookOpen, FiTag, FiEdit2, FiList, FiCheckCircle, FiXCircle, FiExternalLink
} from "react-icons/fi";
import { FaBookOpen, FaHeading, FaLink, FaFolder, FaClock, FaRegFileAlt, FaAtom } from "react-icons/fa"; // Import any icon you like
import { TbPercentage20 } from "react-icons/tb";
import { HiOutlineSparkles } from "react-icons/hi2"; // Sparkle icon for highlights
import { MdOutlineDescription, MdOutlinePerson, MdOutlineEmojiEmotions, MdOutlineToggleOn, } from "react-icons/md";
import { TfiQuoteRight } from "react-icons/tfi";


interface CourseDetailProps {
    course: {
        _id: string; // ✅ match backend and Redux structure
        title: string;
        slug: string;
        category: string;
        subtitle?: string;
        description: string;
        duration: string;
        successRate?: number;
        qualifiedCount?: string;
        yearsOfExcellence?: number;
        bannerImageUrl: string;
        floatingHighlights: string[]; // ✅ rename to match actual property
        examPattern: {
            questionFormat: string;
            duration: string;
            markingSystem: string;
        };
        topicBreakdown: Array<{
            _id?: string;
            topic: string;
            percentage: number;
        }>;
        programs: Array<{
            _id?: string;
            mode: string;
            title: string;
            description: string;
            price: number;
            priceLabel: string;
            features: string[];
        }>;
        whyChooseUs: Array<{
            _id?: string;
            icon: string;
            title: string;
            description: string;
        }>;
        topicCoverage: Array<{
            _id?: string;
            title: string;
            description: string;
        }>;
        faculty: Array<{
            _id?: string;
            name: string;
            designation: string;
            bio: string;
            expertise: string[];
            photoUrl: string;
        }>;
        testimonials: Array<{
            _id?: string;
            name: string;
            scoreSummary: string;
            subjectScore: string;
            quote: string;
            photoUrl: string;
        }>;
        showTrialButton: boolean;
        showBrochureButton: boolean;
        brochureUrl?: string;
        isPublished: boolean;
    };
}



export const CourseDetail = ({ course }: CourseDetailProps) => {
    return (
        <div className="max-w-7xl mx-auto py-8 px-4 bg-white dark:bg-gray-800 rounded-xl">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">{course.title}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">{course.subtitle}</p>
            </header>

            {/* Core Info Section */}
            <CollapsibleSection title="Basic Course Info">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 items-center gap-2">
                            <FaHeading className="text-brand-500" />
                            Title
                        </label>
                        <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded border dark:border-gray-600 text-gray-800 dark:text-gray-200">
                            {course.title}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 items-center gap-2">
                            <FaLink className="text-brand-500" />
                            URL Slug
                        </label>
                        <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded border dark:border-gray-600 text-gray-800 dark:text-gray-200">
                            {course.slug}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <FaFolder className="text-brand-500" />
                            Category
                        </label>
                        <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded border dark:border-gray-600 text-gray-800 dark:text-gray-200">
                            {course.category}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <FaClock className="text-brand-500" />
                            Duration
                        </label>
                        <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded border dark:border-gray-600 text-gray-800 dark:text-gray-200">
                            {course.duration}
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <FaRegFileAlt className="text-brand-500" />
                            Description
                        </label>
                        <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded border dark:border-gray-600 min-h-[100px] text-gray-800 dark:text-gray-200">
                            {course.description}
                        </div>
                    </div>
                </div>
            </CollapsibleSection>

            {/* Key Stats Section */}
            <CollapsibleSection title="Key Metrics">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Success Rate</label>
                        <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded border dark:border-gray-600 flex items-center text-gray-800 dark:text-gray-200">
                            <FiAward className="mr-2 text-brand-500" />
                            {course.successRate}%
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Qualified Students</label>
                        <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded border dark:border-gray-600 flex items-center text-gray-800 dark:text-gray-200">
                            <FiUsers className="mr-2 text-brand-500" />
                            {course.qualifiedCount}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Years of Excellence</label>
                        <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded border dark:border-gray-600 flex items-center text-gray-800 dark:text-gray-200">
                            <FiStar className="mr-2 text-gray-500 dark:text-gray-400" />
                            {course.yearsOfExcellence}
                        </div>
                    </div>
                </div>
            </CollapsibleSection>

            {/* Media Section */}
            <CollapsibleSection title="Course Banner & Highlights">
                <div className="space-y-6">
                    {/* Banner Image Section */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <FiImage className="text-blue-500" />
                            Course Banner
                        </label>

                        {course.bannerImageUrl ? (
                            <img
                                src={course.bannerImageUrl}
                                alt="Course banner"
                                className="w-full max-h-80 rounded-xl border border-gray-300 dark:border-gray-600 shadow"
                            />
                        ) : (
                            <div className="p-8 bg-gray-50 dark:bg-gray-700 rounded-xl border border-dashed dark:border-gray-600 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 shadow-inner">
                                <FiFile className="text-4xl mb-2" />
                                <span>No banner uploaded</span>
                            </div>
                        )}
                    </div>

                    {/* Highlights Section */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <HiOutlineSparkles className="text-yellow-500" />
                            Course Highlights
                        </label>

                        <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-gray-300">
                            {course.floatingHighlights.length > 0 ? (
                                course.floatingHighlights.map((highlight, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <FiFileText className="mt-1 text-brand-500" />
                                        <span>{highlight}</span>
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-500 dark:text-gray-400 italic">No highlights added</li>
                            )}
                        </ul>
                    </div>
                </div>
            </CollapsibleSection>

            {/* Exam Pattern Section */}
            <CollapsibleSection title="Exam Pattern Details">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Question Format</label>
                        <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded border dark:border-gray-600 flex items-center text-gray-800 dark:text-gray-200">
                            <FiClipboard className="mr-2 text-brand-500" />
                            {course.examPattern?.questionFormat}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Exam Duration</label>
                        <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded border dark:border-gray-600 flex items-center text-gray-800 dark:text-gray-200">
                            <FiFilm className="mr-2 text-brand-500" />
                            {course.examPattern?.duration}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Marking System</label>
                        <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded border dark:border-gray-600 flex items-center text-gray-800 dark:text-gray-200">
                            <FiBarChart2 className="mr-2 text-brand-500" />
                            {course.examPattern?.markingSystem}
                        </div>
                    </div>
                </div>
            </CollapsibleSection>

            {/* Topic Breakdown Section */}
            <CollapsibleSection title="Topic Breakdown">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <FaBookOpen className="text-brand-500" />
                                        Topic
                                    </div>
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <TbPercentage20 className="text-brand-500" />
                                        Percentage
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {course.topicBreakdown.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                        <div className="flex items-center gap-2">
                                            <FaBookOpen className="text-brand-500" />
                                            {item.topic}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                        {item.percentage}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CollapsibleSection>

            {/* Programs Offered Section */}
            <CollapsibleSection title="Program Modes">
                <div className="space-y-6">
                    {course.programs.map((program, index) => (
                        <div
                            key={index}
                            className="p-5 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm bg-white dark:bg-gray-700 space-y-4"
                        >
                            {/* Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        <FiBookOpen className="text-brand-500" />
                                        Mode
                                    </label>
                                    <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-600 rounded-md border dark:border-gray-500 text-gray-800 dark:text-gray-200">
                                        {program.mode}
                                    </div>
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        <FiEdit2 className="text-brand-500" />
                                        Program Title
                                    </label>
                                    <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-600 rounded-md border dark:border-gray-500 text-gray-800 dark:text-gray-200">
                                        {program.title}
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        <MdOutlineDescription className="text-brand-500" />
                                        Description
                                    </label>
                                    <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-600 rounded-md border dark:border-gray-500 min-h-[60px] text-gray-800 dark:text-gray-200">
                                        {program.description}
                                    </div>
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        <FiTag className="text-brand-500" />
                                        Price
                                    </label>
                                    <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-600 rounded-md border dark:border-gray-500 text-gray-800 dark:text-gray-200">
                                        ₹{program.price} <span className="text-sm text-gray-500 dark:text-gray-400">{program.priceLabel}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Features */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    <FiList className="text-brand-500" />
                                    Features
                                </label>
                                <ul className="mt-2 list-disc pl-6 space-y-1 text-gray-800 dark:text-gray-300">
                                    {program.features.map((feature, featureIndex) => (
                                        <li key={featureIndex}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </CollapsibleSection>

            {/* Features Section */}
            <CollapsibleSection title="Why Choose Us (Features)">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {course.whyChooseUs.map((feature, index) => (
                        <div key={index} className="p-4 border rounded-lg dark:border-gray-600 dark:bg-gray-700">
                            <div className="flex items-center mb-2">
                                <div className="p-2 bg-blue-50 dark:bg-gray-600 rounded-full mr-3">
                                    <FiStar className="text-brand-500" />
                                </div>
                                <h4 className="font-medium text-gray-800 dark:text-gray-200">{feature.title}</h4>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </CollapsibleSection>

            {/* Topic Coverage Section */}
            <CollapsibleSection title="📘 Topics Covered">
                <div className="space-y-4">
                    {course.topicCoverage.map((topic, index) => (
                        <div
                            key={index}
                            className="p-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="flex items-start gap-3 mb-2">
                                <div className="text-brand-500 text-xl mt-1">
                                    <FaAtom />
                                </div>
                                <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">{topic.title}</h4>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                <p className="whitespace-pre-line">{topic.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CollapsibleSection>

            {/* Faculty Members Section */}
            <CollapsibleSection title="Faculty Details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {course.faculty.map((faculty, index) => (
                        <div
                            key={index}
                            className="p-5 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm bg-white dark:bg-gray-700 space-y-4"
                        >
                            {/* Photo + Name + Designation */}
                            <div className="flex items-start gap-4">
                                {faculty.photoUrl ? (
                                    <img
                                        src={faculty.photoUrl}
                                        alt={faculty.name}
                                        className="w-16 h-16 rounded-full object-cover shadow"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center text-gray-400 dark:text-gray-300 shadow">
                                        <MdOutlinePerson className="text-2xl text-brand-500" />
                                    </div>
                                )}

                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1">
                                        <FiUsers className="text-brand-500" />
                                        {faculty.name}
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center gap-1">
                                        <FiBriefcase className="text-brand-500" />
                                        {faculty.designation}
                                    </p>
                                </div>
                            </div>

                            {/* Bio */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Bio</label>
                                <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-line">{faculty.bio}</p>
                            </div>

                            {/* Expertise */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1 mb-1">
                                    <FiAward className="text-brand-500" />
                                    Expertise
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {faculty.expertise.map((expertise, expertiseIndex) => (
                                        <span
                                            key={expertiseIndex}
                                            className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-xs rounded-full shadow-sm"
                                        >
                                            {expertise}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CollapsibleSection>

            {/* Testimonials Section */}
            <CollapsibleSection title="Student Testimonials">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {course.testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="p-5 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 shadow-sm space-y-3"
                        >
                            {/* Avatar + Name + Scores */}
                            <div className="flex items-start gap-4">
                                {testimonial.photoUrl ? (
                                    <img
                                        src={testimonial.photoUrl}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover shadow"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center text-gray-400 dark:text-gray-300 shadow">
                                        <FiUsers className="text-xl" />
                                    </div>
                                )}

                                <div>
                                    <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1">
                                        <MdOutlineEmojiEmotions className="text-brand-500" />
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center gap-1">
                                        <FiStar className="text-brand-500" />
                                        {testimonial.scoreSummary}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">{testimonial.subjectScore}</p>
                                </div>
                            </div>

                            {/* Quote */}
                            <div className="pl-4 italic text-gray-700 dark:text-gray-300 relative">
                                <TfiQuoteRight className="text-brand-500 text-xl" />
                                {testimonial.quote}
                            </div>
                        </div>
                    ))}
                </div>
            </CollapsibleSection>

            {/* CTAs Section */}
            <CollapsibleSection title="Call to Action">
                <div className="space-y-6">
                    {/* Show Free Trial Toggle */}
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <MdOutlineToggleOn className="text-xl text-brand-500" />
                            Show Free Trial Button
                        </label>
                        <div
                            className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${course.showTrialButton
                                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                                    : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200"
                                }`}
                        >
                            {course.showTrialButton ? (
                                <>
                                    <FiCheckCircle />
                                    Enabled
                                </>
                            ) : (
                                <>
                                    <FiXCircle />
                                    Disabled
                                </>
                            )}
                        </div>
                    </div>

                    {/* Show Brochure Toggle */}
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <MdOutlineToggleOn className="text-xl text-brand-500" />
                            Show Download Brochure
                        </label>
                        <div
                            className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${course.showBrochureButton
                                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                                    : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200"
                                }`}
                        >
                            {course.showBrochureButton ? (
                                <>
                                    <FiCheckCircle />
                                    Enabled
                                </>
                            ) : (
                                <>
                                    <FiXCircle />
                                    Disabled
                                </>
                            )}
                        </div>
                    </div>

                    {/* Brochure URL */}
                    {course.brochureUrl && (
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <MdOutlineDescription className="text-brand-500" />
                                Brochure URL
                            </label>
                            <div className="flex items-center gap-2">
                                <FiDownload className="text-brand-500" />
                                <a
                                    href={course.brochureUrl}
                                    className="text-blue-600 hover:underline dark:text-blue-400 text-sm flex items-center gap-1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Download Brochure <FiExternalLink className="text-xs" />
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </CollapsibleSection>
        </div>
    );
};