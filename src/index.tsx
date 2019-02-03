/// <reference types="styled-components/cssprop" />
import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import "./index.css"

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const shuffle = <T extends any>(items: T[]) => {
  const result = [...items]
  for (let i = 0; i < items.length; i++) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const sample = <T extends any>(items: T[], count: number) => {
  const copied = [...items]
  const result: T[] = []
  for (let i = 0; i < count; i++) {
    const [sampledItem] = copied.splice(
      Math.floor(Math.random() * copied.length),
      1,
    )
    result.push(sampledItem)
  }
  return result
}

type Card = {
  image: string
}

const createCard = (image: string): Card => ({
  image,
})

const cardImages = [..."🍓☕🚀💯🔥🐱"]

const createCards = () =>
  shuffle([...cardImages, ...cardImages].map(createCard))

const App = () => {
  const [cards, setCards] = useState(() => createCards())
  const [selectedCards, setSelectedCards] = useState<Card[]>([])
  const [revealedCards, setRevealedCards] = useState<Card[]>([])
  const [interactionDisabled, setInteractionDisabled] = useState(false)

  useEffect(() => {
    revealSomeCards(cards)
  }, [])

  const revealSomeCards = async (cards: Card[]) => {
    setInteractionDisabled(true)

    setRevealedCards(sample(cards, 6))

    await wait(2000)

    setRevealedCards([])
    setInteractionDisabled(false)
  }

  const cardIsVisible = (card: Card) =>
    selectedCards.includes(card) || revealedCards.includes(card)

  const selectCard = async (card: Card) => {
    if (interactionDisabled) return
    if (cardIsVisible(card)) return
    if (selectedCards.length > 1) return

    setSelectedCards((selected) => [...selected, card])

    if (selectedCards.length === 1) {
      if (selectedCards[0].image === card.image) {
        setRevealedCards((prev) => [...prev, ...selectedCards, card])
        setSelectedCards([])
      } else {
        await wait(800)
        setSelectedCards([])
      }
    }
  }

  const resetGame = async () => {
    setSelectedCards([])
    setRevealedCards([])

    await wait(800)

    const newCards = createCards()
    setCards(newCards)
    revealSomeCards(newCards)
  }

  return (
    <>
      <div className="cards">
        {cards.map((card, index) => (
          <a
            key={index}
            className={`card-container ${
              cardIsVisible(card) ? "card-visible" : ""
            }`}
            href="#"
            role="button"
            onClick={(event) => {
              event.preventDefault()
              selectCard(card)
            }}
            onDragStart={(event) => event.preventDefault()}
          >
            <div className="card-content" />
            <div className="card-content card-text">{card.image}</div>
          </a>
        ))}
      </div>
      <button onClick={resetGame}>reset</button>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
