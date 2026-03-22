import ProjectCard from '@/components/component/view-project'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

type ProjectDetail = {
  name: string
  tools: string
  description: string
  github?: string
  youtube?: string
  images?: string[]
  content: ReactNode
}

export default function Page({ params }: { params: { id: string } }) {
  const slug = params.id

  const projectsBySlug: Record<string, ProjectDetail> = {
    anygrow3: {
      name: 'Anygrow3',
      tools: 'Python, Flask, Websocket',
      description:
        'I re-programed the whole project, orignally programmed in Nodejs, with Python. ',
      github: 'https://github.com/davidlijar/anygrow3.git',
      youtube: 'https://www.youtube.com/embed/CgxNuzuAr1Q',
      content: (
        <>
          <h2 className=" text-lg font-bold mt-5">구현 세부 사항</h2>
          <p>
            Python is used to communicate with the hardware chip device(Serial
            Communication), sending signal to request sensor data, receive and
            do calculation. And then, Tkinter is used to establish control all
            the functions such as connecting, streaming data. Flask is used to
            host front-end web page and websocket is used to communicate between
            back-end server and front-end client.
          </p>
        </>
      ),
    },
    'nama-real-estate': {
      name: 'NAMA Real Estate',
      tools: 'Java, JSP, Javascript, Bootstrap',
      description:
        '이 보고서는 Java Server Pages(JSP) 기술을 사용하여 개발한 부동산 웹사이트에 대한 내용입니다. 이 웹사이트는 주택을 구매 또는 임대하고자 하는 잠재적인 구매자와 임차자뿐만 아니라 자신의 부동산을 등록하고자 하는 부동산 소유주 및 부동산 중개업자를 모두 위한 플랫폼입니다',
      github: 'https://github.com/davidlijar/nama-real-estate-jsp.git',
      youtube: 'https://www.youtube.com/embed/jkwaKtZgZDA',
      content: (
        <>
          <h2 className=" text-lg font-bold mt-5">시스템 설계 및 아키텍처</h2>
          <p>
            웹사이트는 JSP를 사용하여 부동산 목록, 사용자 프로필 및 검색 결과에
            대한 웹 페이지를 동적으로 생성합니다. 서블릿은 로그인, 부동산 검색
            및 연락처 양식을 포함하여 사용자 요청과 상호 작용을 처리합니다.
            JDBC는 웹사이트를 관계형 데이터베이스(예: MySQL)에 연결하며, 이
            데이터베이스는 부동산 세부 정보, 사용자 정보 및 경우에 따라
            커뮤니케이션 기록을 저장합니다. 사용자는 HTML 및 CSS 및 Javascript로
            구축된 사용자 친화적인 인터페이스를 통해 웹사이트와 상호 작용합니다.
          </p>
          <h2 className=" text-lg font-bold mt-5">구현 세부 사항</h2>
          <p>
            웹사이트는 Eclipse IDE를 사용하여 개발되었습니다. 프로젝트 디렉토리
            구조는 JSP 페이지, 서블릿 클래스 및 부동산 데이터, 사용자 정보 및
            경우에 따라 커뮤니케이션 세부 정보를 저장하는 데 사용되는 테이블을
            설명하는 데이터베이스 스키마 파일을 위한 별도 폴더로 구성됩니다.
            JDBC는 데이터베이스에 연결하고 이 데이터에 대한 CRUD 작업(Create,
            Read, Update, Delete)을 수행하는 데 사용되었습니다.
          </p>
        </>
      ),
    },
    'minaw-ai': {
      name: 'MiNaw AI',
      tools:
        'Python, GeminiAPI, LangChain, Azure Speech Recognition, Flask server',
      description:
        'I intially started this project to explore AI world with LLM models.I intended to build a RAG application which can interact with own dataset. So this process is stillongoing...',
      github: 'https://github.com/davidlijar/speech-to-text-azure.git',
      youtube: 'https://www.youtube.com/embed/knJOzX9djJk',
      content: (
        <>
          <h2 className=" text-lg font-bold mt-5">시스템 설계 및 아키텍처</h2>
          <p>
            Mainly programmed with Python. Azure for Speech recognitioin and
            Gemini API for LLM. Flask server for web hosting.
          </p>
          <h2 className=" text-lg font-bold mt-5">구현 세부 사항</h2>
          <p>
            Speech Recognize and speech-to-text and process with Gemini API.
            text-to-speech result of LLM.
          </p>
        </>
      ),
    },
    metagrow: {
      name: 'Metagrow',
      tools: 'Unity, C#, Ready Player Me SDK, Meta Quest 2',
      description:
        'This project is a team project and a project from the class of "Capstone Project" So this process is stillongoing...',
      github: 'https://github.com/davidlijar',
      youtube: 'https://www.youtube.com/embed/LCmQX_PsNso',
      content: (
        <>
          <h2 className=" text-lg font-bold mt-5">시스템 설계 및 아키텍처</h2>
          <p>
            The project is to build a VR shopping mall for clothes where
            customer can explore and purchase clothes virtually. Ready Player Me
            SDK is used to build 3D Avator Creator. For hardware, Meta Quest 2
            is used as UI to experience the VR world.
          </p>
        </>
      ),
    },
    'nama-ecommerce': {
      name: 'NAMA E-commerce',
      tools: 'Reactjs, Firebase',
      description: 'Food Ordering and Delivery website.',
      github: 'https://github.com/NAMA-4/nama-ecommerce.git',
      youtube: 'https://www.youtube.com/embed/xHTkvlO1Vo8',
      content: (
        <>
          <h2 className=" text-lg font-bold mt-5">시스템 설계 및 아키텍처</h2>
          <p>
            Simply developed using Reactjs for front-end and back-end. Firebase
            is used for storing shop infomation and food and product
            information.
          </p>
        </>
      ),
    },
    'li-jar-portfolio': {
      name: 'LI JAR | Portfolio',
      tools: 'Nextjs, TailwindCss, PostgreSQL',
      description: 'Personal Portfolio Webpage.',
      github: 'https://github.com/davidlijar/my-portfolio.git',
      youtube: 'https://www.youtube.com/embed/JobVrZYMTJA',
      content: (
        <>
          <h2 className=" text-lg font-bold mt-5">시스템 설계 및 아키텍처</h2>
          <p>
            Developed mainly using NextJs, TailwindCss and PostgreSQL. Vercel
            for hosting.
          </p>
        </>
      ),
    },
  }

  const project = projectsBySlug[slug]
  if (!project) notFound()

  return (
    <section>
      <ProjectCard project={project} />
    </section>
  )
}
