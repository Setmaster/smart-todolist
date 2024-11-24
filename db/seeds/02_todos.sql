INSERT INTO todos (title, user_id, category, date_created, complete_date, details)
VALUES
  -- User 1
  ('Watch The Matrix', 1, 'Watch', '2024-11-01 20:00:00', NULL, 'Revisit the classic sci-fi action film.'),
  ('Try new Italian restaurant', 1, 'Eat', '2024-11-02 19:00:00', NULL, 'Sample their lasagna and tiramisu.'),
  ('Buy smartphone', 1, 'Buy', '2024-11-03 10:00:00', '2024-11-04 12:00:00', 'Upgrade to the latest model.'),
  ('Read "Deep Work"', 1, 'Read', '2024-11-04 08:30:00', NULL, 'Focus on productivity techniques.'),
  ('Watch Avengers: Endgame', 1, 'Watch', '2024-11-05 21:00:00', NULL, 'Marvel superhero epic finale.'),
  ('Order groceries', 1, 'Buy', '2024-11-06 09:00:00', '2024-11-07 10:00:00', 'Include fresh produce and snacks.'),
  ('Eat brunch at Pancake House', 1, 'Eat', '2024-11-07 11:00:00', NULL, 'Try their signature pancakes.'),
  ('Finish "Sapiens"', 1, 'Read', '2024-11-08 15:00:00', NULL, 'Learn more about human history.'),
  ('Watch Inception', 1, 'Watch', '2024-11-09 22:00:00', NULL, 'A mind-bending thriller by Nolan.'),
  ('Buy gaming keyboard', 1, 'Buy', '2024-11-10 16:00:00', '2024-11-11 18:00:00', 'Prefer mechanical keys for gaming.'),

  -- User 2
  ('Read "Clean Code"', 2, 'Read', '2024-11-01 08:00:00', NULL, 'Improve programming skills.'),
  ('Eat at Steakhouse Grill', 2, 'Eat', '2024-11-02 20:00:00', NULL, 'Celebrate with friends.'),
  ('Watch Breaking Bad', 2, 'Watch', '2024-11-03 22:00:00', NULL, 'Start binge-watching the iconic series.'),
  ('Buy ergonomic chair', 2, 'Buy', '2024-11-04 13:00:00', '2024-11-05 14:30:00', 'Reduce back strain while working.'),
  ('Try vegan recipes', 2, 'Eat', '2024-11-05 18:00:00', NULL, 'Experiment with plant-based meals.'),
  ('Read "1984" by George Orwell', 2, 'Read', '2024-11-06 14:00:00', NULL, 'A classic dystopian novel.'),
  ('Watch The Witcher', 2, 'Watch', '2024-11-07 23:00:00', NULL, 'Catch up on season two.'),
  ('Buy running shoes', 2, 'Buy', '2024-11-08 11:00:00', '2024-11-09 12:30:00', 'Prepare for marathon training.'),
  ('Eat lunch at Thai Delight', 2, 'Eat', '2024-11-09 13:00:00', NULL, 'Try their green curry and pad thai.'),
  ('Read "The Pragmatic Programmer"', 2, 'Read', '2024-11-10 09:00:00', NULL, 'Enhance coding knowledge.'),

  -- User 3
  ('Buy art supplies', 3, 'Buy', '2024-11-01 14:00:00', '2024-11-02 16:00:00', 'Stock up on canvases and paints.'),
  ('Watch Black Mirror', 3, 'Watch', '2024-11-02 21:00:00', NULL, 'Explore futuristic dystopian themes.'),
  ('Read "Meditations" by Marcus Aurelius', 3, 'Read', '2024-11-03 08:00:00', NULL, 'Discover stoic philosophy.'),
  ('Eat dinner at Sushi Go', 3, 'Eat', '2024-11-04 19:00:00', NULL, 'Try their omakase menu.'),
  ('Buy birthday gift for Alex', 3, 'Buy', '2024-11-05 10:00:00', '2024-11-06 11:00:00', 'Find a unique present.'),
  ('Watch Money Heist', 3, 'Watch', '2024-11-06 22:00:00', NULL, 'Spanish crime thriller series.'),
  ('Read "Thinking, Fast and Slow"', 3, 'Read', '2024-11-07 12:00:00', NULL, 'A deep dive into cognitive biases.'),
  ('Eat at Taco Fiesta', 3, 'Eat', '2024-11-08 20:00:00', NULL, 'Try their spicy tacos and margaritas.'),
  ('Watch Gladiator', 3, 'Watch', '2024-11-09 20:00:00', NULL, 'Classic Roman epic film.'),
  ('Buy bookshelf', 3, 'Buy', '2024-11-10 09:00:00', '2024-11-11 12:00:00', 'Organize books and decorations.'),

  -- Remaining evenly distributed
  ('Read "The Four Agreements"', 1, 'Read', '2024-11-11 07:00:00', NULL, 'A guide to personal freedom.'),
  ('Buy smartwatch', 2, 'Buy', '2024-11-12 15:00:00', '2024-11-13 17:00:00', 'Track health and fitness.'),
  ('Eat brunch at Cafe Royale', 3, 'Eat', '2024-11-13 11:00:00', NULL, 'Try their eggs benedict and coffee.'),
  ('Watch Dune', 1, 'Watch', '2024-11-14 21:00:00', NULL, 'Epic adaptation of Frank Herbert\'s novel.'),
  ('Read "The Lean Startup"', 2, 'Read', '2024-11-15 09:00:00', NULL, 'Learn startup methodologies.'),
  ('Buy camping gear', 3, 'Buy', '2024-11-16 12:00:00', '2024-11-17 15:00:00', 'Prepare for weekend trips.'),
  ('Eat at Indian Palace', 1, 'Eat', '2024-11-17 19:00:00', NULL, 'Order butter chicken and naan.'),
  ('Watch Schindler\'s List', 2, 'Watch', '2024-11-18 22:00:00', NULL, 'Historical drama by Spielberg.'),
  ('Read "The Power of Habit"', 3, 'Read', '2024-11-19 08:00:00', NULL, 'Understand habit formation.'),
  ('Buy a drone', 1, 'Buy', '2024-11-20 10:00:00', '2024-11-21 14:00:00', 'Explore aerial photography.');
