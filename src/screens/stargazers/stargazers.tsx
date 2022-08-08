import React, {useEffect, useMemo} from 'react';
import {FlatList, Image, Text} from 'react-native';
import styled from 'styled-components/native';
import {ERROR as LOADER_ERROR, LOADING_DATA} from '../../assets/lottie';
import {AnimatedIllustration} from '../../components/animated-illustration/animated-illustration';
import {BaseScreen} from '../../components/base-screen/base-screen';
import {LayoutView} from '../../components/layout-view';
import {useContextStar} from '../../contexts/StarContext';
import {Stargazer} from '../../models/star';
import {stargazerApi} from '../../services/repos-api';

enum RDLoader {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

const Avatar = styled(Image)`
  width: 56px;
  height: 56px;
  border-radius: 40px;
`;

export const StargazersScreen: React.FC<{}> = () => {
  const {owner, repo} = useContextStar();
  const [loader, setLoader] = React.useState(RDLoader.LOADING);
  const [stargazers, setStargazers] = React.useState<Stargazer[]>([]);

  useEffect(() => {
    stargazerApi
      .listStargazers({owner, repo})
      .then(result => {
        setStargazers(result);
        setLoader(RDLoader.SUCCESS);
      })
      .catch(e => {
        console.error('ERROR: ', e);
        setLoader(RDLoader.ERROR);
      });
  }, [owner, repo]);

  const renderItem = useMemo(
    () =>
      ({item}: {item: Stargazer}) => {
        return (
          <LayoutView alignItems="center" flexDirection="row">
            <Avatar source={{uri: item.avatar_url}} />
            <LayoutView marginLeft={16} />
            <Text>{item.login}</Text>
          </LayoutView>
        );
      },
    [],
  );

  const Content = useMemo(() => {
    switch (loader) {
      case RDLoader.LOADING:
        return <AnimatedIllustration loop size={256} source={LOADING_DATA} />;
      case RDLoader.SUCCESS:
        return (
          <FlatList
            bounces={false}
            // eslint-disable-next-line react-native/no-inline-styles
            contentContainerStyle={{paddingBottom: 32}}
            data={stargazers}
            ItemSeparatorComponent={() => (
              <LayoutView
                borderWidth={1}
                borderColor="whitesmoke"
                marginVertical={8}
              />
            )}
            initialNumToRender={2}
            keyExtractor={item => item.id.toString()}
            maxToRenderPerBatch={1}
            removeClippedSubviews={true}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            updateCellsBatchingPeriod={100}
            windowSize={7}
          />
        );
      case RDLoader.ERROR:
        return <AnimatedIllustration size={256} source={LOADER_ERROR} />;
    }
  }, [loader, renderItem, stargazers]);

  return (
    <BaseScreen isBackButton title={owner} subtitle={repo}>
      {Content}
    </BaseScreen>
  );
};
