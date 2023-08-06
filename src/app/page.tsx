'use client'
import { NextPage } from 'next'
import Image from 'next/image'

import { v4 as uuidv4 } from 'uuid'
import { motion } from 'framer-motion'

import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'

import InputComponent from '@/components/Input/input.component'
import { db } from '@/services/firebase'
import { Header } from '@/components/Header'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import sucessIcon from '../../public/sucess.svg'
interface ICampaign {
  id: string
  name: string
  count: number
  max_count: number
  current_link: number
  link: string[]
}

const Campanha: NextPage = () => {
  const [campaignName, setCampaignName] = useState('Campanha 01')
  const [campaign, setCampaign] = useState<ICampaign>({} as ICampaign)

  const [links, setLinks] = useState<string[]>([])

  const [maxCount, setMaxCount] = useState(10)
  const [step, setStep] = useState(1)
  const [inputs, setInputs] = useState<string[]>([''])

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

  // MUITA COISA EM UM CLIENT COMPONENT
  // ISOLAR EM COMPONENTS CLIENTS MENORES. REMOVER O useClient Dessa PAGE PARA MELHORAR PERFORMANCE.

  const CAMPAIGN_NAME = campaign?.name
    ?.toLocaleLowerCase()
    ?.trim()
    .replaceAll(' ', '-')
  function handleRedirectHomePage() {
    window.location.reload()
  }
  return (
    <>
      <Header />
      <section className="flex items-center  flex-col w-full pt-20 bg-slate-100 h-screen overflow-hidden">
        <div className="flex items-center justify-center flex-col  w-full max-w-2xl">
          <div className="max-w-2xl mb-5">
            <h1 className="text-blue-950 text-3xl font-bold mb-1">
              Cadastre sua Campanha
            </h1>
            <p className="text-slate-400 w-80 m-auto text-center">
              Por favor, preencha os campos solicitados e avance para proxima
              etapa.
            </p>
          </div>
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-white w-full max-w-2xl  min-h-96 rounded-3xl drop-shadow-md flex justify-center items-center p-9"
          >
            {step === 1 && (
              <div className="flex flex-col w-full ">
                <h3 className="text-blue-950 font-semibold mb-3 ml-2 text-xl">
                  Nome da Campanha
                </h3>
                <InputComponent
                  placeholder="Insira o nome da campanha"
                  onChange={(e) => setCampaignName(e.target.value)}
                />
              </div>
            )}
            {step === 2 && (
              <div className="flex flex-col w-full">
                <h3 className="text-blue-950 font-semibold mb-3 ml-2 text-xl">
                  Quantidade de click
                </h3>

                <InputComponent
                  type="number"
                  placeholder="Insira a Quantidade de cliques"
                  onChange={(e) => setMaxCount(Number(e.target.value))}
                />
              </div>
            )}
            {step === 3 && (
              <div className="flex flex-col w-full ">
                <h3 className="text-blue-950 font-semibold mb-3 ml-2 text-xl">
                  Insira seu link
                </h3>
                <div>
                  {inputs.map((input, index) => (
                    <div className="flex flex-row-reverse" key={index}>
                      {index === 0 && (
                        <button
                          className="bg-blue-900 w-10 rounded-full ml-2 h-11  "
                          onClick={handleAddInput}
                        >
                          +
                        </button>
                      )}
                      {index > 0 && (
                        <button
                          className="bg-red-800 w-10 rounded-full ml-2 h-11  "
                          onClick={() => handleRemoveInput(index)}
                        >
                          -
                        </button>
                      )}
                      <InputComponent
                        placeholder={`Link Nº${index + 1}`}
                        value={input}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </div>
                  ))}
                </div>

                {/* <InputComponent placeholder='Link 02' value={link2} onChange={e => setLink2(e.target.value)} />
                <InputComponent placeholder='Link 03' value={link3} onChange={e => setLink3(e.target.value)} /> */}
              </div>
            )}
            {step === 4 && (
              <div className="flex flex-col w-full ">
                <Image src={sucessIcon} className="m-auto" alt="" />
                <h3 className="text-blue-950 font-semibold mb-3 ml-2 text-xl text-center">
                  Campanha criada com Sucesso
                </h3>
                <p className="text-blue-950 text-center mb-2">
                  Copie ou clique no link abaixo
                </p>

                {!!campaign?.name && (
                  <a
                    className="text-blue-900 text-center mb-2"
                    target="_blank"
                    href={`http://localhost:3000/${CAMPAIGN_NAME}?id=${campaign.id}`}
                    rel="noreferrer"
                  >
                    {`http://localhost:3000/${CAMPAIGN_NAME}?id=${campaign.id}`}
                  </a>
                )}
                <button
                  className="bg-blue-500 hover:bg-blue-700 rounded-2xl h-10"
                  onClick={handleRedirectHomePage}
                >
                  Inicio
                </button>
              </div>
            )}
          </motion.div>

          <div className="w-full max-w-2xl flex justify-end align-center">
            <div className="flex align-center gap-4 m-2">
              {step > 1 && step < 4 && (
                <button
                  className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold w-20 h-10 border border-gray-400 rounded-xl"
                  onClick={() => handleStepChange('previous')}
                >
                  Voltar
                </button>
              )}

              {step < 3 ? (
                <button
                  className="p-2 bg-blue-500 hover:bg-blue-700 rounded-xl w-20"
                  onClick={() => handleStepChange('next')}
                >
                  Avançar
                </button>
              ) : step === 3 ? (
                <button
                  className="p-2 bg-blue-500 hover:bg-blue-700 rounded-xl w-20"
                  onClick={onSubmit}
                >
                  Enviar
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  )
}

export default Campanha
