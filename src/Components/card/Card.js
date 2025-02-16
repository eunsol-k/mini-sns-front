import CardContents from "./Card-contents";
import CardFooter from "./Card-footer";
import CardHeader from "./Card-header";

export default function Card({Key, card}) {
    return (
        <>
            <CardHeader card={card} />
            <CardContents card={card}/>
            <CardFooter card={card}/>
        </>
    )
}