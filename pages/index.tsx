import { NextPage } from "next";
import { useEffect, useState } from "react";

const IndexPage: NextPage = () => {
	// useStateを使って状態を定義
	const [imageUrl, setImageUrl] = useState("");
	const [loading, setLoading] = useState(true);

	// マウント時に画像を取り込む宣言	
	useEffect(() => {
		fetchImage().then((newImage) => {
			setImageUrl( newImage.url); // 画像URLの状態を更新する
			setLoading(false); // ローディング状態を更新
		});
	}, []);

	const handleClick = async () => {
		setLoading( true ); // 読み込み中フラグを立てる
		const newImg = await fetchImage();
		setImageUrl(newImg.url);
		setLoading( false ); // 読み込み中フラグを折る
	};
	// ローディング中でなければ画像を表示	
	return (
		<div>
			<button
				onClick={handleClick}
				style={{
				backgroundColor: "#319795",
				border: "none",
				borderRadius: "4px",
				color: "white",
				padding: "4px 8px",
				}}
			>
			きょうのにゃんこ🐱
		</button>
			<div>{ loading || <img src={ imageUrl }/> }</div>
		</div>
	);
};

export default IndexPage;

type Image = {
	url: string;
}

// async は非同期処理を示す
const fetchImage = async (): Promise<Image> => {
	// HTTPリクエストでリソースを取得する
	const res = await fetch( "https://api.thecatapi.com/v1/images/search" );
	const images = await res.json();
	console.log( images );
	return images[0];	
};

fetchImage();