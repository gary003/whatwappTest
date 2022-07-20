export enum moneyTypes {
  HARDCURRENCY = "hard_currency",
  SOFTCURRENCY = "soft_currency",
}

export type userWallet = {
  userId: string
  walletId: string
  clubId: string | null
  wallet: {
    walletId: string
    hard_currency: number
    soft_currency: number
  }
}
