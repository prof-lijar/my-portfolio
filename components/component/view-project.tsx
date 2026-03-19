

import Image from 'next/image'

const ProjectCard = ({ project }: { project: any }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-black rounded-lg mb-6">
      <h2 className="text-2xl font-bold mb-2">{project.name}</h2>

      <p className="text-gray-600 mb-4">
        <span className="font-semibold">Tools & Technology:</span> {project.tools}
      </p>

      <p className="mb-4">{project.description}</p>

      {project.github && (
        <div className="mb-4">
          <a
            href={project.github}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Source Code on GitHub
          </a>
        </div>
      )}

      {project.images?.length > 0 && (
        <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {project.images.map((src: string, index: number) => (
            <div key={`${src}-${index}`} className="relative w-full aspect-video overflow-hidden rounded-md bg-gray-100">
              <Image
                src={src}
                alt={`${project.name} image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {project.youtube && (
        <div className="mb-4">
          <iframe
            width="100%"
            height="315"
            src={project.youtube}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div className="prose">{project.content}</div>
    </div>
  )
}

export default ProjectCard