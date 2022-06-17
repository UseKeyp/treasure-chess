import Carousel from './Carousel'

export default {
  title: 'Components/Carousel',
  component: Carousel,
}

export const generated = (args) => {
  return <Carousel {...args} />
}
generated.args = {
  items: [...Array(2)].map((_, id) => <div key={id}>{id}</div>),
}
