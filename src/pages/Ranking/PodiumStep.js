import { motion } from 'framer-motion';

export default function PodiumStep({ player }) {
  const offset = 5;
  return (
    <div
      style={ {
        display: 'flex',
        flexDirection: 'column',
        placeContent: 'center',
      } }
    >
      <motion.div
        className="winners"
        style={ {
          alignSelf: 'center',
          marginBottom: '.15rem',
        } }
        initial="hidden"
        animate="visible"
        variants={ {
          visible: {
            opacity: 1,
            transition: {
              delay: offset - 3,
              duration: 0.75,
            },
          },
          hidden: { opacity: 0 },
        } }
      >
        <img
          alt={ player.name }
          src={ player.picture }
          style={ {
            width: '70px',
            overflow: 'hidden',
            height: '70px',
            borderRadius: 100,
            textAlign: 'center',
          } }
        />
        <p className="winner-name">{player.name}</p>
      </motion.div>
      <motion.div
        style={ {
          width: '150px',
          placeContent: 'center',
          display: 'flex',
          borderTopLeftRadius: '.5rem',
          borderTopRightRadius: '.5rem',
          borderColor: 'rgba(190,24,93,1)',
          backgroundColor: '#09e792',
          marginBottom: -1,
        } }
        initial="hidden"
        animate="visible"
        variants={ {
          visible: {
            height: 1 * (+player.score / 2.5),
            opacity: 1,
            transition: {
              delay: 0.05,
              duration: 2,
              ease: 'backInOut',
            },
          },
          hidden: { opacity: 0, height: 0 },
        } }
      >
        <span className="winners-score">{`${player.score} pts`}</span>
      </motion.div>
    </div>
  );
}

PodiumStep.propTypes = {}.isRequired;
