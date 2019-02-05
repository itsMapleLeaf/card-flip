import React, { useEffect, useState } from "react"
import Card from "./Card"
import sample from "./sample"
import shuffle from "./shuffle"
import wait from "./wait"

type CardData = {
  image: string
}

const createCard = (image: string): CardData => ({
  image,
})

const cardImages = [..."🍓☕🚀💯🔥🐱✨👀"]

const createCards = () =>
  shuffle([...cardImages, ...cardImages].map(createCard))

const App = () => {
  const [cards, setCards] = useState(() => createCards())
  const [selectedCards, setSelectedCards] = useState<CardData[]>([])
  const [revealedCards, setRevealedCards] = useState<CardData[]>([])
  const [interactionDisabled, setInteractionDisabled] = useState(false)
  const [attemptCount, setAttemptCount] = useState(0)

  useEffect(() => {
    revealSomeCards(cards)
  }, [])

  const revealSomeCards = async (cards: CardData[]) => {
    setInteractionDisabled(true)

    setRevealedCards(sample(cards, 8))

    await wait(2000)

    setRevealedCards([])
    setInteractionDisabled(false)
  }

  const cardIsVisible = (card: CardData) =>
    selectedCards.includes(card) || revealedCards.includes(card)

  const selectCard = async (card: CardData) => {
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
        setAttemptCount((count) => count + 1)
      }
    }
  }

  const resetGame = async () => {
    setSelectedCards([])
    setRevealedCards([])
    setAttemptCount(0)

    await wait(800)

    const newCards = createCards()
    setCards(newCards)
    revealSomeCards(newCards)
  }

  return (
    <>
      <main className="cards">
        {cards.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            onSelect={() => selectCard(card)}
            isVisible={cardIsVisible(card)}
          />
        ))}
      </main>
      <h1 className="attempt-counter">{Array(attemptCount).fill("❌")}</h1>
      <button onClick={resetGame}>Reset</button>
    </>
  )
}
export default App
