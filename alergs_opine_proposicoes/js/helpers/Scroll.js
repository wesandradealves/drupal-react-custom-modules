export const scrollIntoView = (destination) => {
  return document.getElementById(destination).scrollIntoView({
    behavior: 'smooth'
  });
}
