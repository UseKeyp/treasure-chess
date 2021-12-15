// Define your own mock data here:
export const standard = () => {
  return {
    nftDetails: {
      owner: 'Patrick',
      creator: 'Also Patrick',
      title: 'My precious title!',
      bids: {
        100: 'Person 1',
        25: 'Person 3',
        10: 'Person 5',
      },
      nftHistory: [
        'Person Bid $100',
        'Something happened',
        'Put on sale for - $1000',
        'Created - May 2021',
      ],
    },
  };
};
