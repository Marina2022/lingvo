import React, { useCallback, useEffect, useState } from "react";

const mediaTypes = {
	xSmall: 'xSmall',
	small: 'small',
	medium: 'medium',
	large: 'large',
	xLarge: 'xLarge',
	xxLarge: 'xxLarge'
}

const mediaList = [
	{ type: mediaTypes.xSmall,   minWidth: 1,     maxWidth: 575,	 		 }, 
	{ type: mediaTypes.small,    minWidth: 576,   maxWidth: 767,	 		 }, 
	{ type: mediaTypes.medium,   minWidth: 768,   maxWidth: 991,	 		 }, 
	{ type: mediaTypes.large,    minWidth: 992,   maxWidth: 1199, 			 }, 
	{ type: mediaTypes.xLarge,   minWidth: 1200,  maxWidth: 1399, 			 },
	{ type: mediaTypes.xxLarge,  minWidth: 1400,  maxWidth: Number.MAX_VALUE }
]

const event = new Event('content-changed')

/**
 * Gets relevant media content
 * 
 * @param { Array<{type: String, content: JSX.Element}> | 
 * 		{
 * 			xSmall:	JSX.Element, 	
 * 			small:	JSX.Element, 	
 * 			medium:	JSX.Element, 	
 * 			large:	JSX.Element,	
 * 			xLarge:	JSX.Element,	
 * 			xxLarge:JSX.Element
 * 		}
 * } contentList the media content list
 * @param { width: Number, hight: Number } param1 the window sizes
 * @returns {JSX.Element} the relevant media content
 */
function getContent (contentList, {width, hight}) {
	let resultContent = <></>
	
	mediaList.find(mediaItem => {
		resultContent = (
			// gets relevant content value from contentList
			Array.isArray(contentList) ? 
				// if contentList has Array type
				contentList.find(contentItem => contentItem.type === mediaItem.type)?.content : 
				// if contentList has Object type
				contentList[mediaItem.type]
			) ||
			// gets previous content value if no relevant content
			resultContent
		return width <= mediaItem.maxWidth
	})
	return resultContent 
}

/**
 * Gets media content from input parameter of array or object type suitable for the screen width
 * 
 * @param {{ contentList:
 * 		Array<{ type: String, content: JSX.Element }> |
 * 		{
 * 			xSmall:	JSX.Element,
 * 			small:	JSX.Element,
 * 			medium:	JSX.Element,
 * 			large:	JSX.Element,
 * 			xLarge:	JSX.Element,
 * 			xxLarge:JSX.Element
 * 		}
 * }} props
 * @param props.contentList array or object containing the content list
 * @returns {JSX.Element} the relevant media content
 */
const GetMediaContent = (props) => {
	const { contentList } = props

	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		hight: window.innerHeight
	})


	const resizeHandler = useCallback(() => {
		setWindowSize({
			width: window.innerWidth,
			hight: window.innerHeight
		})
	}, [])

	useEffect(() => {		
		/** Registers event handler */
		window.addEventListener('resize', resizeHandler)
		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, 
	[resizeHandler])

	const result = getContent(contentList, windowSize)

	setTimeout(() => window.dispatchEvent(event), 100); 

	return result
}

export default GetMediaContent