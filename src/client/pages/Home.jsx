import React from 'react';
import { useQuery } from '@wasp/queries';

export function HomePage() {
  const { data: funnyStories, isLoading: isLoadingFunnyStories, error: errorFunnyStories } = useQuery(getFunnyStories);
  const { data: conversations, isLoading: isLoadingConversations, error: errorConversations } = useQuery(getConversations);
  const { data: funFacts, isLoading: isLoadingFunFacts, error: errorFunFacts } = useQuery(getFunFacts);
  const { data: trivia, isLoading: isLoadingTrivia, error: errorTrivia } = useQuery(getTrivia);
  const { data: quotes, isLoading: isLoadingQuotes, error: errorQuotes } = useQuery(getQuotes);

  if (isLoadingFunnyStories || isLoadingConversations || isLoadingFunFacts || isLoadingTrivia || isLoadingQuotes) return 'Loading...';
  if (errorFunnyStories || errorConversations || errorFunFacts || errorTrivia || errorQuotes) return 'Error: ' + (errorFunnyStories || errorConversations || errorFunFacts || errorTrivia || errorQuotes);

  return (
    <div>
      <h1>Welcome to MoodBos</h1>
      <div>
        <h2>Funny Stories</h2>
        {funnyStories.map((story) => (
          <div key={story.id}>
            <h3>{story.title}</h3>
            <p>{story.content}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Conversations</h2>
        {conversations.map((conversation) => (
          <div key={conversation.id}>
            <h3>{conversation.title}</h3>
            <p>{conversation.content}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Fun Facts</h2>
        {funFacts.map((fact) => (
          <div key={fact.id}>
            <h3>{fact.title}</h3>
            <p>{fact.content}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Trivia</h2>
        {trivia.map((trivia) => (
          <div key={trivia.id}>
            <h3>{trivia.title}</h3>
            <p>{trivia.content}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Quotes</h2>
        {quotes.map((quote) => (
          <div key={quote.id}>
            <h3>{quote.title}</h3>
            <p>{quote.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}