'use client'
import { NextPage } from 'next'

import { motion } from 'framer-motion'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import sucessIcon from '../../public/sucess.svg'

import { Steps } from '@/components/Steps'
import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { useCampaign } from '@/hooks/useCampaign'

const Campanha: NextPage = () => {
  const {
    handleRedirectHomePage,
    CAMPAIGN_NAME,
    handleRemoveInput,
    handleAddInput,
    handleInputChange,
    handleStepChange,
    onSubmit,
    inputs,
    setMaxCount,
    setCampaignName,
    step,
    campaign,
  } = useCampaign()
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
          <div className="bg-white w-full max-w-2xl rounded-t-3xl border-b-2 border-slate-100">
            <h2 className=" w-fit m-auto p-3 my-2 rounded-full bg-blue-500 ">
              {step}
            </h2>
          </div>
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-white w-full max-w-2xl  min-h-96 rounded-b-3xl drop-shadow-md flex justify-center items-center p-9"
          >
            <Steps
              step={step}
              setCampaignName={setCampaignName}
              setMaxCount={setMaxCount}
              inputs={inputs}
              handleAddInput={handleAddInput}
              handleRemoveInput={handleRemoveInput}
              campaign={campaign}
              handleInputChange={handleInputChange}
              handleRedirectHomePage={handleRedirectHomePage}
              sucessIcon={sucessIcon}
              CAMPAIGN_NAME={CAMPAIGN_NAME}
            />
          </motion.div>

          <div className="w-full max-w-2xl flex justify-end align-center">
            <div className="flex align-center gap-4 m-2">
              <Button
                step={step}
                handleStepChange={handleStepChange}
                onSubmit={onSubmit}
              />
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  )
}

export default Campanha
