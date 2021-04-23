import React from "react";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  setPlayingState: (state: boolean) => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  clearPlayerState: () => void;
};

export const PlayerContext = React.createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: React.ReactNode
    //ReactNode is a way to say type a element that can receive anything
}

export function PlayerContextProvider({ children } : PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = React.useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLooping, setIsLooping] = React.useState(false);
  const [isShuffling, setIsShuffling] = React.useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleLoop() {
    setIsLooping(!isLooping)
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

  function playNext() {
      if (isShuffling) {
        const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
        setCurrentEpisodeIndex(nextRandomEpisodeIndex)
      } else if(hasNext) {
        setCurrentEpisodeIndex(currentEpisodeIndex + 1);
      }      
  }

  function playPrevious() {
      if (hasPrevious) {
        setCurrentEpisodeIndex(currentEpisodeIndex - 1);
      }    
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        playList,
        play,
        playNext,
        playPrevious,
        isPlaying,
        togglePlay,
        setPlayingState,
        hasNext,
        hasPrevious,
        isLooping,
        toggleLoop,
        toggleShuffle,
        isShuffling,
        clearPlayerState
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
    return React.useContext(PlayerContext)
}
