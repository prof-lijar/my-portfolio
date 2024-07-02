
interface props{
    content : string
}

const CalculateReadingTime:React.FC<props> = ({content}) =>{


    function calculateReadingTime(text: string, wordsPerMinute: number = 250): number {
        const words = text.split(/\s+/).length; // Split text by whitespace and count words
        const readingTime = words / wordsPerMinute; // Calculate reading time in minutes
        return readingTime;
    }

    const text = content;

    const time = calculateReadingTime(text);
  

    return (
        <section>
            <p className="text-sm">{time.toFixed(2)} min read</p>
        </section>
    )
}


export default CalculateReadingTime;