import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import styled, { css, keyframes } from 'styled-components'
import { Milliseconds } from '@lib/utils/time/types'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { convertDuration } from '@lib/utils/time/convertDuration'

interface AnimatedDurationProps {
  getDuration: (currentTime: number) => Milliseconds
}

const CharacterContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
`

const getAnimation = (id: string) => keyframes`
  0% {
    --id: ${id};
    bottom: 0%;
  }
`

const Character = styled(Text)<{ animationId?: string }>`
  position: absolute;
  bottom: -100%;
  ${({ animationId }) =>
    animationId &&
    css`
      animation: ${getAnimation(animationId)} 640ms ease-in-out;
    `}
`

export const AnimatedDuration = ({ getDuration }: AnimatedDurationProps) => {
  const now = useRhythmicRerender()

  const duration = getDuration(now)
  const timeString = formatDuration(duration, 'ms', {
    kind: 'digitalClock',
    minUnit: 's',
  })
  const previousTimeString = formatDuration(
    Math.max(0, duration - convertDuration(1, 's', 'ms')),
    'ms',
    {
      kind: 'digitalClock',
      minUnit: 's',
    },
  )

  return (
    <HStack>
      {timeString.split('').map((character, index) => {
        const previousCharacter = previousTimeString[index]
        const animationId =
          previousCharacter !== character
            ? `${previousCharacter}${character}`
            : undefined
        const color = index > timeString.length - 4 ? 'supporting' : 'contrast'

        return (
          <CharacterContainer key={index}>
            <Text style={{ visibility: 'hidden' }}>{character}</Text>
            <Character as="div" color={color} animationId={animationId}>
              <Text>{character}</Text>
              <Text>{previousCharacter}</Text>
            </Character>
          </CharacterContainer>
        )
      })}
    </HStack>
  )
}
