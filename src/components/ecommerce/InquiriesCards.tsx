import { ArrowUpIcon } from "../../icons";
import Badge from "../ui/badge/Badge";
import course from "../../Assets/courses.png";
import { PiStudentDuotone } from "react-icons/pi";
import { useNavigate } from "react-router";
import type { AdminDashboardData } from "./type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { getAllUsers } from "../../redux/slices/users";

interface EcommerceMetricsProps {
    data: AdminDashboardData | null;
}

export default function InquiriesCards({ data }: EcommerceMetricsProps) {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    // ✅ Grab all users from users slice
    const { users } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    // ✅ Count only users with role === "user"
    const userCount = users?.filter((u) => u.role === "user").length || 0;


    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {/* Card 1 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <img
                        src={course}
                        alt=""
                        className="w-10 cursor-pointer"
                        onClick={() => navigate("/course/list")}
                    />
                </div>
                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Total enquiries
                        </span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            {data?.courseCount ?? 0}
                        </h4>
                    </div>
                    <Badge>
                        <ArrowUpIcon />
                        11.01%
                    </Badge>
                </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <PiStudentDuotone className="text-gray-800 size-10 dark:text-white/10 cursor-pointer" />
                </div>
                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Contacted
                        </span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            {userCount}
                        </h4>
                    </div>
                    <Badge>
                        <ArrowUpIcon />
                        9.05%
                    </Badge>
                </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <PiStudentDuotone className="text-gray-800 size-10 dark:text-white/10 cursor-pointer" />
                </div>
                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Unanswered enquiries
                        </span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            {userCount}
                        </h4>
                    </div>
                    <Badge>
                        <ArrowUpIcon />
                        9.05%
                    </Badge>
                </div>
            </div>
        </div>

    );
}
