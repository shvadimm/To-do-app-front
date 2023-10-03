import { Link, useNavigate } from 'react-router-dom';


export default function Example() {
    return (
        <section className="text-gray-700 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                        Bienvenue sur TO DO LIFE!
                        <br className="hidden lg:inline-block" />
                    </h1>
                    <p className="mb-8 leading-relaxed">
                        Nous sommes ravis de vous accueillir ici pour vous aider à organiser et gérer vos tâches quotidiennes de manière plus efficace.
                        Une liste de tâches bien organisée peut vous aider à rester concentré,productif et à atteindre vos objectifs plus facilement
                    </p>
                    <div className="flex justify-center">
                        <button className="inline-flex text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded text-lg">
                            <Link
                                to="/Listtodos"
                            >
                                Commencer maintenant
                            </Link>
                        </button>

                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <img
                        className="object-cover object-center rounded"
                        alt="hero"
                        src='../welcomepage.png'
                    />
                </div>
            </div>
        </section>
    )
}