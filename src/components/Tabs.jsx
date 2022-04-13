import React from 'react'

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Tabs ({ tabs, currentState, setCurrentState }) {
  const clickHandler = (name) => {
    setCurrentState(name)
  }
  return (
    <div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-400">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <div
                key={tab.name}
                onClick={() => clickHandler(tab.name)}
                className={classNames(
                  currentState === tab.name
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm'
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
