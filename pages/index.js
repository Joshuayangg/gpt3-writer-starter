import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import joyangProfile from '../assets/joyang_profile.jpeg'

const Home = () => {
  const [userInput, setUserInput] = useState('')
  const onUserChangedText = (event) => {
    setUserInput(event.target.value)
  }
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true)
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    })

    const data = await response.json()
    const { output } = data

    setApiOutput(`${output.text}`)
    document.getElementById('output_content').innerHTML = output.text
    setIsGenerating(false)
  }

  return (
    <div className="root">
      <Head>
        <title>Learn Anything | Your GPT-3 Personalized Learning Coach</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Learn Anything</h1>
          </div>
          <div className="header-subtitle">
            <h2>
              Tell me a skill or topic you want to learn (be specific!), and I
              will give you 7 steps with links to online resources to master
              this skill.
            </h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="Type what you want to learn here. Ex. 'jazz piano in the style of Bill Evans', 'vlogging as a paintball content creator'..."
            value={userInput}
            onChange={onUserChangedText}
          />
        </div>
        <div className="prompt-buttons">
          <a
            className={
              isGenerating ? 'generate-button loading' : 'generate-button'
            }
            onClick={callGenerateEndpoint}
          >
            <div className="generate">
              {isGenerating ? (
                <span className="loader"></span>
              ) : (
                <p>Generate</p>
              )}
            </div>
          </a>
        </div>
        <div className="output">
          <div className="output-header-container">
            <div className="output-header">
              <h3>{apiOutput ? 'Steps' : ''}</h3>
            </div>
          </div>
          <div className="output-content" id="output_content"></div>
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://twitter.com/joyang_eth"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={joyangProfile} alt="joyang profile" />
            <p>Built by @joyang_eth</p>
          </div>
        </a>
      </div>
    </div>
  )
}

export default Home
