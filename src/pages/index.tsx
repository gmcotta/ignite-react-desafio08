import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface LastPageDataProps {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}
interface LastPageProps {
  after: string | null;
  data: LastPageDataProps[];
}

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = null }) => {
      const { data: responseData } = await api.get('/api/images', {
        params: { after: pageParam },
      });
      return responseData;
    },
    {
      getNextPageParam: (lastPage: LastPageProps) => {
        return lastPage?.after ?? null;
      },
    }
  );

  const formattedData = useMemo(() => {
    return data?.pages.map(item => item.data).flat();
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button
            isLoading={isFetchingNextPage}
            loadingText="Carregando..."
            onClick={() => fetchNextPage()}
          >
            Carregar mais
          </Button>
        )}
      </Box>
    </>
  );
}
