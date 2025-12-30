import XSvg from "../svgs/X";

import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Sidebar = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

	const { mutate: logout } = useMutation({
		mutationFn: async () => {
			const res = await fetch(
				`${import.meta.env.VITE_API_URL}/api/auth/logout`,
				{
					method: "POST",
					credentials: "include",
				}
			);

			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.error || "Logout failed");
			}
		},
		onSuccess: () => {
			toast.success("Logout Successful");
			queryClient.setQueryData(["authUser"], null);
			navigate("/login", { replace: true });
		},
		onError: () => {
			toast.error("Logout failed");
		},
	});

	return (
		<div className='md:flex-[2_2_0] w-18 max-w-52'>
			<div className='sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full'>
				
				{/* Logo */}
				<Link to='/' className='flex justify-center md:justify-start'>
					<XSvg className='px-2 w-12 h-12 rounded-full fill-white hover:bg-stone-900' />
				</Link>

				{/* Nav */}
				<ul className='flex flex-col gap-3 mt-4'>
					<li>
						<Link
							to='/'
							className='flex gap-3 items-center hover:bg-stone-900 rounded-full py-2 pl-2 pr-4'
						>
							<MdHomeFilled className='w-8 h-8' />
							<span className='hidden md:block'>Home</span>
						</Link>
					</li>

					<li>
						<Link
							to='/notifications'
							className='flex gap-3 items-center hover:bg-stone-900 rounded-full py-2 pl-2 pr-4'
						>
							<IoNotifications className='w-6 h-6' />
							<span className='hidden md:block'>Notifications</span>
						</Link>
					</li>

					{authUser && (
						<li>
							<Link
								to={`/profile/${authUser.username}`}
								className='flex gap-3 items-center hover:bg-stone-900 rounded-full py-2 pl-2 pr-4'
							>
								<FaUser className='w-6 h-6' />
								<span className='hidden md:block'>Profile</span>
							</Link>
						</li>
					)}
				</ul>

				{/* Footer / Logout */}
				{authUser && (
					<div className='mt-auto mb-10 flex gap-2 items-center px-4 py-2 hover:bg-[#181818] rounded-full'>
						<div className='avatar hidden md:inline-flex'>
							<img
								src={authUser.profileImg || "/avatar-placeholder.png"}
								className='w-8 rounded-full'
							/>
						</div>

						<div className='flex justify-between flex-1'>
							<div className='hidden md:block'>
								<p className='font-bold text-sm truncate'>
									{authUser.fullName}
								</p>
								<p className='text-slate-500 text-sm'>
									@{authUser.username}
								</p>
							</div>

							<BiLogOut
								className='w-5 h-5 cursor-pointer'
								onClick={logout}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Sidebar;
