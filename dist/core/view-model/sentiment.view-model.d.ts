export declare class SentimentViewModel {
    score: number;
    positiveScore: number;
    negativeScore: number;
    comparative: number;
    category: string;
    tokens: Token[];
    words: string[];
    positive: string[];
    negative: any[];
}
export declare class Token {
    value: string;
    negate: boolean;
}
