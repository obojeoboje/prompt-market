export interface Prompt {
  id: string
  Title: string
  Category: string
  Teaser: string
  Description: string
  PriceRUB: number
  Cover?: { url: string }[]
  AuthorName?: string
  AuthorAvatar?: { url: string }[]
  AuthorBio?: string
  PayLink?: string
}
