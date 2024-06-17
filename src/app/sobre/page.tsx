'use client';
import adrianoImg from '@/assets/img/adriano.jpeg';
import gabrielImg from '@/assets/img/gabriel.jpeg';
import joaoImg from '@/assets/img/joao.jpeg';
import washingtonImg from '@/assets/img/teste1.jpg';
import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/SideBar';
import styles from '@/styles/sobre.module.css';
import Image from 'next/image';

export default function Home() {

  const students = [
    { name: 'Adriano Silva', image: adrianoImg, description: 'Desenvolvedor Front-end', stack: 'React com Next.js e Node.js' },
    { name: 'Gabriel', image: gabrielImg, description: 'Desenvolvedor Front-end', stack: 'React com Next.js e Node.js' },
    { name: 'Washington', image: washingtonImg, description: 'Desenvolvedor Back-end', stack: 'C#/.NET, NodeJs, criação de sistema robusto e escaláveis' },
    { name: 'João', image: joaoImg, description: 'Desenvolvedor Back-end', stack: 'Python | Java | Flutter/Dart | C#/.NET | PostgreSQL' },
  ];

  return (
    <>
      <Header />
      <Sidebar />
      <div className={styles.background}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-3 mb-4">
              <div className={`card ${styles.card}`}>
                <div className={styles.cardImage}>
                  <Image src={students[0].image} alt={students[0].name} width={306} height={446} />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{students[0].name}</h5>
                  <p className="card-text">{students[0].description}</p>
                  <h4>Open to Working</h4>
                  <p className="card-text">{students[0].stack}</p>
                  <div>
                    <a href="https://github.com/adrianosilva22" target="_blank">
                      <strong> @adrianosilva22 | </strong>
                      <i className="fa-brands fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 mb-4">
              <div className={`card ${styles.card}`}>
                <div className={styles.cardImage}>
                  <Image src={students[1].image} alt={students[1].name} width={306} height={446} />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{students[1].name}</h5>
                  <p className="card-text">{students[1].description}</p>
                  <p className="card-text">{students[1].stack}</p>
                  <div>
                  <a href="https://github.com/adrianosilva22" target="_blank">
                      <strong> @gabriel | </strong>
                      <i className="fa-brands fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 mb-4">
              <div className={`card ${styles.card}`}>
                <div className={styles.cardImage}>
                  <Image src={students[2].image} alt={students[2].name} width={306} height={446} />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{students[2].name}</h5>
                  <p className="card-text">{students[2].description}</p>
                  <p className="card-text">{students[2].stack}</p>
                  <div>
                  <a href="https://github.com/washingtoncandido" target="_blank">
                      <strong> @washingtoncandido | </strong>
                      <i className="fa-brands fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 mb-4">
              <div className={`card ${styles.card}`}>
                <div className={styles.cardImage}>
                  <Image src={students[3].image} alt={students[3].name} width={306} height={446} />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{students[3].name}</h5>
                  <p className="card-text">{students[3].description}</p>
                  <h4>Open to Working</h4>
                  <p className="card-text">{students[3].stack}</p>
                  <div>
                  <a href="https://github.com/Joaosamaia" target="_blank">
                      <strong> @Joaosamaia | </strong>
                      <i className="fa-brands fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
