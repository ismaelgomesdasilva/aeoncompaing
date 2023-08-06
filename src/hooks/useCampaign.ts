/* eslint-disable @typescript-eslint/no-unused-vars */
import { addDoc, collection } from 'firebase/firestore'
import { toast } from 'react-toastify'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ICampaign } from '../types/type'
import { db } from '@/services/firebase'

export const useCampaign = () => {
  const [campaignName, setCampaignName] = React.useState<string>('')
  const [campaign, setCampaign] = React.useState<ICampaign>({} as ICampaign)
  const [links, setLinks] = React.useState<string[]>([])
  const [maxCount, setMaxCount] = React.useState<number>(10)

  const [step, setStep] = React.useState<number>(1)
  const [inputs, setInputs] = React.useState<string[]>([''])
  // Logica de cadastro
  const onSubmit = async () => {
    try {
      const uuid = uuidv4()
      const data = {
        id: uuid,
        name: campaignName,
        count: 0,
        max_count: maxCount,
        current_link: 0,
        link: links,
      }

      await addDoc(collection(db, 'campaign'), data)
      setCampaign(data)
      console.log('CAMPANHA CRIADA')
    } catch (err) {
      console.log('OCORREU ALGUM ERRO AO CRIAR A CAMPANHA', err)
    }
    setStep(4)
  }

  const handleStepChange = (action: 'next' | 'previous') => {
    if (action === 'next' && step < 3) {
      setStep(step + 1)
    } else if (action === 'previous' && step > 1) {
      setStep(step - 1)
    }
  }
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = e.target
    setInputs((prevInputs) => {
      const newInputs = [...prevInputs]
      newInputs[index] = value
      return newInputs
    })
    setLinks((prevLinks) => {
      const newLinks = [...prevLinks]
      newLinks[index] = value
      return newLinks
    })
  }
  const handleAddInput = () => {
    setInputs((prevInputs) => {
      if (prevInputs.length < 5) {
        const newInputs = [...prevInputs, '']
        return newInputs
      } else {
        toast.error('Você só pode cadastrar até 5 links', {
          position: 'top-right',
          autoClose: 2000,
          theme: 'light',
        })
        return prevInputs
      }
    })
  }

  const handleRemoveInput = (index: number) => {
    setInputs((prevInputs) => {
      const newInputs = [...prevInputs]
      newInputs.splice(index, 1)
      return newInputs
    })
  }
  const CAMPAIGN_NAME = campaign?.name
    ?.toLocaleLowerCase()
    ?.trim()
    .replaceAll(' ', '-')
  function handleRedirectHomePage() {
    window.location.reload()
  }
  //
  return {
    handleRedirectHomePage,
    CAMPAIGN_NAME,
    handleRemoveInput,
    handleAddInput,
    handleInputChange,
    handleStepChange,
    onSubmit,
    campaign,
    inputs,
    setMaxCount,
    setCampaignName,
    step,
  }
}
