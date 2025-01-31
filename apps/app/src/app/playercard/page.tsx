"use client";

import { useToPng } from "@hugocxl/react-to-image";
import Image from "next/image";
import { useState } from "react";

const ICONS_SAMPLE = [
	"/assets/img/playercard/icons/1.png",
	"/assets/img/playercard/icons/2.png",
	"/assets/img/playercard/icons/3.png",
	"/assets/img/playercard/icons/4.png",
	"/assets/img/playercard/icons/5.png",
	"/assets/img/playercard/icons/6.png",
	"/assets/img/playercard/icons/7.png",
	"/assets/img/playercard/icons/8.png",
	"/assets/img/playercard/icons/9.png",
	"/assets/img/playercard/icons/10.png",
	"/assets/img/playercard/icons/11.png",
	"/assets/img/playercard/icons/12.png",
];

export default function Page() {
	const [color, setColor] = useState("");
	const [, convert, ref] = useToPng<HTMLDivElement>({
		onSuccess: (data) => {
			const link = document.createElement("a");
			link.download = "my-image-name.png";
			link.href = data;
			link.click();
		},
	});

	return (
		<div>
			<h1>Player Card</h1>
			<button onClick={convert} type="button">
				Convert to PNG
			</button>
			<div className="flex flex-row">
				<div className="relative" ref={ref}>
					<Image
						src="/assets/img/playercard/bg2.png"
						alt="Player Card UI"
						width={458}
						height={642}
					/>

					<Image
						className="absolute top-20 z-[1]"
						src="/assets/img/playercard/body/201.png"
						alt="Body"
						width={600}
						height={600}
					/>

					<Image
						className="absolute top-20 z-100"
						src="/assets/img/playercard/color/2.png"
						alt="Color"
						width={600}
						height={600}
					/>

					<Image
						className="absolute top-20"
						src="/assets/img/playercard/face/101.png"
						alt="Face"
						width={600}
						height={600}
					/>

					<Image
						className="absolute top-20"
						src="/assets/img/playercard/feet/351.png"
						alt="Feet"
						width={600}
						height={600}
					/>

					<Image
						className="absolute top-20 z-[3]"
						src="/assets/img/playercard/hands/220.png"
						alt="Hands"
						width={600}
						height={600}
					/>

					<Image
						className="absolute top-20"
						src="/assets/img/playercard/head/21118.png"
						alt="Head"
						width={600}
						height={600}
					/>

					<Image
						className="absolute top-20 z-[2]"
						src="/assets/img/playercard/neck/3015.png"
						alt="Neck"
						width={600}
						height={600}
					/>

					<Image
						className="absolute top-[110px] left-4"
						src="/assets/img/playercard/pin/615.png"
						alt="Pin"
						width={600}
						height={600}
					/>

					<Image
						src="/assets/img/playercard/background/903.png"
						alt="Background"
						width={600}
						height={0}
						className="absolute top-[113px] -z-[1] [mask-image:url(/assets/img/playercard/mask2.png)] [mask-size:410px_422px] [mask-position:22px_0px] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]"
					/>
				</div>

				<div className="flex flex-row bg-white/75 h-[594px] w-[450px] mt-10 ml-[-26px] pt-[20px] border-[3px] border-gray-800 rounded-r-3xl gap-3">
					<div className="ml-[30px] mt-2">
						<div className="grid grid-cols-3 grid-rows-4 gap-3 hover:cursor-pointer">
							{ICONS_SAMPLE.map((_, i) => (
								<div
									onClick={() => {}}
									key={`icon-${i}`}
									className="bg-white opacity-100 h-[110px] w-[110px] flex items-center justify-center rounded outline-[3px] outline outline-gray-300 hover:bg-gray-300 hover:outline-gray-500 hover:cursor-pointer"
								>
									<Image src={_} alt="Player Card" width={100} height={100} />
								</div>
							))}
						</div>
					</div>
					<div className="h-full w-10 flex flex-col justify-between items-center pb-6 relative">
						<div className="bg-blue-500 absolute h-full w-10 -z-[3] rounded-full" />
						<Image
							src="/assets/img/playercard/arrow.png"
							alt="up"
							width={32}
							height={32}
						/>
						<Image
							src="/assets/img/playercard/arrow.png"
							alt="up"
							width={32}
							height={32}
							className="rotate-180"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
