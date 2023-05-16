import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";

const ListItem = ({ data }: { data: string }) => {
  return (
    <div>
      <div
        style={{
          textAlign: "center",
          lineHeight: 5,
          fontSize: "2rem",
          border: "1px solid black",
          height: 200
        }}
      >
        {data}
      </div>
    </div>
  );
};

const fakeFetch = (delay = 1000) =>
  new Promise((res) => setTimeout(res, delay));

const currentData = [
  "apple",
  "banana",
  "orange",
  "lemon",
  "lime",
  "pure",
  "peach",
  "berry"
];

const nextItem = [
  "dorian",
  "mango",
  "starfruit",
  "dragonFruit",
  "almond",
  "walnut",
  "grape",
  "persimmon"
];

const Home: NextPage = () => {
  const target = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<{ item: string[]; isLoading: boolean }>({
    item: [...currentData],
    isLoading: false
  });
  const fetchItems = async (nextItem: string[]) => {
    setState((prev) => ({
      ...prev,
      isLoading: true
    }));
    await fakeFetch();
    setState((prev) => ({
      item: [...prev.item, ...nextItem],
      isLoading: false
    }));
  };
  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(
        async ([e], observer) => {
          if (e.isIntersecting) {
            observer.unobserve(e.target);
            await fetchItems(nextItem);
            observer.observe(e.target);
          }
        },
        { threshold: 1 }
      );
      observer.observe(target.current as Element);
    }
    return () => observer.disconnect();
  }, [target]);

  const { item, isLoading } = state;

  return (
    <div>
      {item.map((fruit, i) => {
        return <ListItem key={i} data={fruit} />;
      })}
      <div ref={target}>
        {isLoading && (
          <div
            style={{
              textAlign: "center",
              lineHeight: 5,
              fontSize: "2rem",
              border: "1px solid black",
              height: 200,
              background: "#eee"
            }}
          >
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
