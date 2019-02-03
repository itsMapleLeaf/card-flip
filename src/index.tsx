/// <reference types="styled-components/cssprop" />
import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import "./index.css"

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
  id: number
  image: string
}

let cardId = 0
const createCard = (image: string): Card => ({
  id: cardId++,
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

  useEffect(() => revealSomeCards(cards), [])

  const revealSomeCards = (cards: Card[]) => {
    setInteractionDisabled(true)

    setRevealedCards(sample(cards, 6))

    setTimeout(() => {
      setRevealedCards([])
      setInteractionDisabled(false)
    }, 2000)
  }

  const cardIsVisible = (card: Card) =>
    selectedCards.includes(card) || revealedCards.includes(card)

  const selectCard = (card: Card) => {
    if (interactionDisabled) return
    if (cardIsVisible(card)) return
    if (selectedCards.length > 1) return

    setSelectedCards((selected) => [...selected, card])

    if (selectedCards.length === 1) {
      if (selectedCards[0].image === card.image) {
        setRevealedCards((prev) => [...prev, ...selectedCards, card])
        setSelectedCards([])
      } else {
        setTimeout(() => {
          setSelectedCards([])
        }, 800)
      }
    }
  }

  const resetGame = () => {
    const newCards = createCards()
    setCards(newCards)
    setSelectedCards([])
    // setRevealedCards([])
    revealSomeCards(newCards)
  }

  return (
    <>
      <div className="cards">
        {cards.map((card) => (
          <a
            className="card"
            href="#"
            role="button"
            onClick={(event) => {
              event.preventDefault()
              selectCard(card)
            }}
          >
            {cardIsVisible(card) ? card.image : "?"}
          </a>
        ))}
      </div>
      <button onClick={resetGame}>reset</button>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
