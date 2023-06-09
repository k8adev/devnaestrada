import Image from 'next/image';
import { getEpisodesList } from '../../services/libsyn';
import { useQuery } from '@tanstack/react-query';

export default function HomeFeed() {
  const {
    data: episodesList,
  } = useQuery({
    queryKey: ['feedEps'],
    queryFn: () => getEpisodesList(),
  });

  return (
    <div
      className={`
        grid
        grid-cols-1
        divide-y
      `}
    >
      {episodesList?.map(
        (ep, i) => (
          <div
            key={`ep-${i}`}
            className={`
              grid
              grid-cols-[200px,_1fr]
              gap-x-4
              py-8
            `}
          >
            <div>
              <Image
                src={ep.itunes.image}
                alt=""
                width={200}
                height={200}
              />
            </div>

            <div>
              <ul
                className={`
                  grid
                  grid-flow-col
                  auto-cols-max
                  gap-x-2
                  text-xs
                `}
              >
                {ep.itunes.keywords?.split(',').map(
                  (keyword, j) => (
                    <li
                      key={`tags-${i}-${j}`}
                      className={`
                        bg-primary
                        text-gray-800
                        px-2
                        py-1
                        rounded-md
                        mb-2
                        lowercase
                      `}
                    >
                      {keyword}
                    </li>
                  )
                )}
              </ul>

              <div className="overflow-hidden">
                <h2
                  className={`
                    text-2xl
                    text-gray-950
                    mb-2
                    line-clamp-1
                  `}
                >
                  {ep.title}
                </h2>
              </div>

              <div
                className={`
                  text-base
                `}
              >
                <p>{ep.contentSnippet}</p>
              </div>
            </div>
          </div>
        ),
        )}
    </div>
  )
}
