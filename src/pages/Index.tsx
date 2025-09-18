import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Массив фотографий для галереи
  const photos = [
    {
      id: 1,
      src: '/img/bb5e3b60-5006-42e6-bf84-b297dd537dea.jpg',
      title: 'Современная композиция',
      description: 'Яркий дизайн с градиентами'
    },
    {
      id: 2,
      src: '/img/7a2ba191-ac5e-4f67-b7c7-ae2c8529a185.jpg',
      title: 'Горный пейзаж',
      description: 'Драматический закат'
    },
    {
      id: 3,
      src: '/img/50d97dcb-9588-4bca-8868-a06f58a23f34.jpg',
      title: 'Городская жизнь',
      description: 'Неоновые огни города'
    },
    {
      id: 4,
      src: 'https://v3b.fal.media/files/b/lion/P7CH6oWEzB30Yt9i2jScU_output.png',
      title: 'Портрет у моря',
      description: 'Естественное освещение'
    },
    {
      id: 5,
      src: '/img/bb5e3b60-5006-42e6-bf84-b297dd537dea.jpg',
      title: 'Абстрактное искусство',
      description: 'Игра цветов и форм'
    },
    {
      id: 6,
      src: '/img/7a2ba191-ac5e-4f67-b7c7-ae2c8529a185.jpg',
      title: 'Природная красота',
      description: 'Величие природы'
    }
  ];

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % photos.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? photos.length - 1 : selectedImage - 1);
    }
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: 'Open Sans, sans-serif' }}>
      {/* Градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-coral via-turquoise to-softyellow opacity-10"></div>
      
      {/* Основной контент */}
      <div className="relative z-10">
        {/* Заголовок */}
        <header className="text-center py-16 px-4">
          <h1 
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-coral via-turquoise to-softyellow bg-clip-text text-transparent animate-fade-in mb-4"
            style={{ fontFamily: 'Rubik, sans-serif' }}
          >
            ФОТО ГАЛЕРЕЯ
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 animate-fade-in max-w-2xl mx-auto">
            Коллекция моментов, запечатлённых во времени. Поделись ссылкой и покажи друзьям!
          </p>
          
          {/* Кнопка поделиться */}
          <div className="mt-8 animate-scale-in">
            <Button 
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="bg-gradient-to-r from-coral to-turquoise hover:from-turquoise hover:to-coral text-white px-8 py-3 text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Icon name="Share2" className="mr-2" size={20} />
              Поделиться галереей
            </Button>
          </div>
        </header>

        {/* Сетка фотографий */}
        <main className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photos.map((photo, index) => (
              <Dialog key={photo.id}>
                <DialogTrigger asChild>
                  <Card 
                    className="group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fade-in border-0"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelectedImage(index)}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      
                      {/* Градиентный оверлей */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Текст поверх фото */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-xl font-semibold mb-1" style={{ fontFamily: 'Rubik, sans-serif' }}>
                          {photo.title}
                        </h3>
                        <p className="text-sm opacity-90">
                          {photo.description}
                        </p>
                      </div>
                      
                      {/* Иконка увеличения */}
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Icon name="Maximize2" size={20} className="text-white" />
                      </div>
                    </div>
                  </Card>
                </DialogTrigger>
                
                {/* Полноэкранный просмотр */}
                <DialogContent className="max-w-4xl w-full h-[80vh] p-0 bg-black/95 border-0">
                  <div className="relative h-full flex items-center justify-center">
                    {selectedImage !== null && (
                      <>
                        {/* Изображение */}
                        <img
                          src={photos[selectedImage].src}
                          alt={photos[selectedImage].title}
                          className="max-w-full max-h-full object-contain animate-scale-in"
                        />
                        
                        {/* Навигация */}
                        <Button
                          onClick={prevImage}
                          variant="ghost"
                          size="lg"
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full p-3"
                        >
                          <Icon name="ChevronLeft" size={24} />
                        </Button>
                        
                        <Button
                          onClick={nextImage}
                          variant="ghost"
                          size="lg"
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full p-3"
                        >
                          <Icon name="ChevronRight" size={24} />
                        </Button>
                        
                        {/* Информация о фото */}
                        <div className="absolute bottom-6 left-6 right-6 text-center text-white">
                          <h3 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'Rubik, sans-serif' }}>
                            {photos[selectedImage].title}
                          </h3>
                          <p className="text-lg opacity-80">
                            {photos[selectedImage].description}
                          </p>
                          <p className="text-sm opacity-60 mt-2">
                            {selectedImage + 1} из {photos.length}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </main>
        
        {/* Футер */}
        <footer className="text-center py-8 px-4">
          <div className="flex justify-center items-center space-x-6 text-gray-600">
            <Button variant="ghost" className="hover:text-coral transition-colors">
              <Icon name="Camera" className="mr-2" size={20} />
              Все фото
            </Button>
            <Button variant="ghost" className="hover:text-turquoise transition-colors">
              <Icon name="Heart" className="mr-2" size={20} />
              Избранное
            </Button>
            <Button variant="ghost" className="hover:text-softyellow transition-colors">
              <Icon name="Download" className="mr-2" size={20} />
              Скачать
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;