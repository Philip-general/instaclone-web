import PropTypes from 'prop-types'
import React from 'react'
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons'
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import { FatText } from '../shared'
import Avatar from '../Avatar'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 5px;
  margin-bottom: 20px;
  max-width: 615px;
`
const PhotoHeader = styled.div`
  padding: 15px;
  display: felx;
  align-items: center;
`
const Username = styled(FatText)`
  margin-left: 15px;
`

const PhotoFile = styled.div`
  border-top: 1px solid ${props => props.theme.borderColor};
  img {
    width: 100%;
  }
`
const PhotoData = styled.div`
  padding: 15px;
`

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
  }
`

const PhotoAction = styled.div`
  cursor: pointer;
  margin-right: 10px;
  svg {
    font-size: 20px;
  }
`
const Likes = styled(FatText)`
  display: block;
  margin-top: 15px;
`

function Photo({ id, user, file, isLiked, totalLike }) {
  const [toggleLikeMutation, { loading }] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
  })
  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Avatar lg url={user.avatar} />
        <Username>{user.username}</Username>
      </PhotoHeader>
      <PhotoFile>
        <img alt="그림" src={file} />
      </PhotoFile>
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={toggleLikeMutation}>
              <FontAwesomeIcon
                size={'2x'}
                style={{ color: isLiked ? 'tomato' : 'inherit' }}
                icon={isLiked ? SolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon size={'2x'} icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon size={'2x'} icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <PhotoAction>
              <FontAwesomeIcon size={'2x'} icon={faBookmark} />
            </PhotoAction>
          </div>
        </PhotoActions>
        <Likes>{totalLike === 1 ? '1 like' : `${totalLike} likes`}</Likes>
      </PhotoData>
    </PhotoContainer>
  )
}

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  totalLike: PropTypes.number.isRequired,
}

export default Photo
