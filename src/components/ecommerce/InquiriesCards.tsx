import { ArrowUpIcon } from "../../icons";
import Badge from "../ui/badge/Badge";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch} from "../../redux/store";
import { useEffect } from "react";
import { getAllInQuiries, selectStatusCounts } from "../../redux/slices/admission";
import { MdOutlineContentPasteSearch ,MdWifiCalling3} from "react-icons/md";
import { TbPhoneCalling } from "react-icons/tb";



export default function InquiriesCards() {
    const dispatch = useDispatch<AppDispatch>();

    // ✅ Grab all users from users slice

    useEffect(() => {
        dispatch(getAllInQuiries());
    }, [dispatch]);

     const { total, pending, contacted } = useSelector(selectStatusCounts);


    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
            {/* Total Courses */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <MdOutlineContentPasteSearch className="text-gray-800 size-10 dark:text-white/10 cursor-pointer"/>
                </div>
                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Total enquiries
                        </span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            {total}
                        </h4>
                    </div>
                    <Badge>
                        <ArrowUpIcon /> 11.01%
                    </Badge>
                </div>
            </div>

            {/* Total Students */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <MdWifiCalling3 className="text-gray-800 size-10 dark:text-white/10 cursor-pointer" />
                </div>
                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Contacted
                        </span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            {contacted}
                        </h4>
                    </div>
                    <Badge>
                        <ArrowUpIcon /> 9.05%
                    </Badge>
                </div>
            </div>

            {/* Unanswered enquiries */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <TbPhoneCalling className="text-gray-800 size-10 dark:text-white/10 cursor-pointer" />
                </div>
                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Unasnwered enquiries
                        </span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            {pending}
                        </h4>
                    </div>
                    <Badge>
                        <ArrowUpIcon /> 9.05%
                    </Badge>
                </div>
            </div>
        </div>


    );
}
