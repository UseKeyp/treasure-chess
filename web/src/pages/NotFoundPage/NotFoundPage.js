import { MetaTags } from '@redwoodjs/web'

import DefaultLayout from 'src/layouts/DefaultLayout'

export default () => (
  <DefaultLayout>
    <MetaTags title="No Go" description="Page not found" />
    <main className="not-found">
      <section className="not-found--container">
        <div className="not-found--img">
          <img src="/no-go.png" className="h-auto w-full block" alt="" />
        </div>
        <div className="not-found--content">
          <h1>No go! 404</h1>
          <p>The page you are looking for doesn&apos;t exist</p>
        </div>
      </section>
    </main>
  </DefaultLayout>
)
