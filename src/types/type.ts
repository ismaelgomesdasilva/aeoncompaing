import { ChangeEvent } from 'react'

export interface ICampaignParams {
  params: {
    campanha: string
    link: string
  }
  searchParams: {
    id: string
  }
}
export interface ICampaign {
  id: string
  name: string
  count: number
  max_count: number
  current_link: number
  link: string[]
}
export interface ISteps {
  step: number
  setCampaignName: (name: string) => void
  setMaxCount: (count: number) => void
  inputs: string[]
  handleAddInput: () => void
  handleRemoveInput: (index: number) => void
  campaign: {
    id: string
    name: string
  }
  handleInputChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void
  handleRedirectHomePage: () => void
  sucessIcon: string
  CAMPAIGN_NAME: string
}
export interface IButton {
  step: number
  handleStepChange: (action: 'previous' | 'next') => void
  onSubmit: () => void
}
