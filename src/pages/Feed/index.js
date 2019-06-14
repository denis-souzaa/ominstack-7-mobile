import React, { Component } from 'react';
import api from '~/services/api';
import
{
  View,
  Image,
  TouchableOpacity,
  FlatList,
}
  from 'react-native';

import
{
  Container,
  FeedItem,
  FeedItemHeader,
  TextName,
  TextPlace,
  PostImage,
  FeedItemFooter,
  Actions,
  Likes,
  Description,
  HashTags,
  Action,
}
  from './styles';

import camera from '~/assets/camera.png';
import more from '~/assets/more.png';
import like from '~/assets/like.png';
import comment from '~/assets/comment.png';
import send from '~/assets/send.png';

export default class Feed extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('New')} style={{ marginRight: 20 }}>
        <Image source={camera} />
      </TouchableOpacity>
    ),
  });

  state = {
    posts: [],
  };

  async componentDidMount() {
    const response = await api.get('posts');
    this.setState({ posts: response.data });
  }

  render() {
    return (
      <Container>
        <FlatList
          // eslint-disable-next-line react/destructuring-assignment
          data={this.state.posts}
          keyExtractor={post => post._id}
          renderItem={({ item }) => (
            <FeedItem>
              <FeedItemHeader>
                <View>
                  <TextName>{item.author}</TextName>
                  <TextPlace>{item.place}</TextPlace>
                </View>
                <Image source={more} />
              </FeedItemHeader>
              <PostImage source={{ uri: `http://10.10.2.2:3003/files/${item.image}` }} />
              <FeedItemFooter>
                <Actions>
                  <Action onPress={() => {}}>
                    <Image source={like} />
                  </Action>
                  <Action>
                    <Image source={comment} />
                  </Action>
                  <Action>
                    <Image source={send} />
                  </Action>
                </Actions>
                <Likes>{item.likes} curtidas</Likes>
                <Description>{item.description}</Description>
                <HashTags>{item.hashtags}</HashTags>
              </FeedItemFooter>
            </FeedItem>
          )}
        />
      </Container>
    );
  }
}
