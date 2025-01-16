/*
  # Recipe Database Schema

  1. New Tables
    - `recipes`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `ingredients` (text[])
      - `instructions` (text[])
      - `cooking_time` (integer)
      - `difficulty` (text)
      - `servings` (integer)
      - `nutrition` (jsonb)
      - `dietary_tags` (text[])
      - `image_url` (text)
      - `rating` (numeric)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `user_preferences`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `dietary_restrictions` (text[])
      - `favorites` (uuid[])
      - `ratings` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create recipes table
CREATE TABLE recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  ingredients text[] NOT NULL,
  instructions text[] NOT NULL,
  cooking_time integer NOT NULL,
  difficulty text NOT NULL,
  servings integer NOT NULL,
  nutrition jsonb NOT NULL,
  dietary_tags text[],
  image_url text,
  rating numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_preferences table
CREATE TABLE user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  dietary_restrictions text[],
  favorites uuid[],
  ratings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Recipes policies
CREATE POLICY "Anyone can read recipes"
  ON recipes
  FOR SELECT
  TO public
  USING (true);

-- User preferences policies
CREATE POLICY "Users can read own preferences"
  ON user_preferences
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON user_preferences
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON user_preferences
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);