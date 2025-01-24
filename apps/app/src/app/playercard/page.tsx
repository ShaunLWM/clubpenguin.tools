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
						src="/assets/img/playercard/bg.png"
						alt="Player Card UI"
						width={430}
						height={0}
					/>
					<Image
						className="absolute top-20 z-10"
						src="/assets/img/playercard/color/base-1.png"
						alt="Color"
						width={399}
						height={579}
					/>
					<Image
						className="absolute top-20 z-10"
						src="/assets/img/playercard/pin/615.png"
						alt="Pin"
						width={399}
						height={579}
					/>
					<Image
						className="absolute top-20 z-10"
						src="/assets/img/playercard/neck/3015.png"
						alt="Neck"
						width={399}
						height={579}
					/>
					<Image
						className="absolute top-20 z-10"
						src="/assets/img/playercard/head/21118.png"
						alt="Head"
						width={399}
						height={579}
					/>

					<Image
						src="/assets/img/playercard/background/902.png"
						alt="Player Card"
						width={399}
						height={579}
						className="absolute top-20 left-[-3px] [mask-image:url(/assets/img/playercard/mask.png)] [mask-size:362px_360px] [mask-position:18px_26px] [mask-repeat:no-repeat]
  [-webkit-mask-repeat:no-repeat]"
					/>
				</div>

				<div className="flex flex-row bg-white/75 h-[530px] w-[450px] mt-10 ml-[-70px] pt-[20px] border-[3px] border-gray-800 rounded-3xl">
					<div className="ml-[48px]">
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
					<div className="bg-red-100 h-full w-10 flex flex-col justify-between items-center pb-6">
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
