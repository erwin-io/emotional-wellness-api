export class SentimentViewModel {
    score: number
    positiveScore: number
    negativeScore: number
    comparative: number
    category: string
    tokens: Token[]
    words: string[]
    positive: string[]
    negative: any[]
  }
  
export class Token {
    value: string
    negate: boolean
}
  