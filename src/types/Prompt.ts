export interface Prompt {
  id: string
  Title: string
  Category: string
  Description: string
  PriceRUB: number
  Model?: string
  Length?: number          //  видно только в модалке
  RatingAvg?: number       //  “средняя оценка”
  RatingCnt?: number       //  “кол-во оценок”
  Cover?: { url: string }[]
  AuthorName?: string
  AuthorAvatar?: { url: string }[]
  AuthorBio?: string
  TributeLink?: string
}
