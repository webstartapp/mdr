import { LoggerService } from '@backend/logger';
import { authenticate, validateBody, AuthRequest } from '@backend/middleware';
import { IMdrService } from '@backend/service/mdr.service';
import { restAPICall } from '@backend/service/restAPI';
import { Router } from 'express';

import { getGetMyselfUrl, getSignInUrl, getSignOutUrl } from '@/gen/mdr';
import { signInBody } from '@/gen/mdr.zod';

/**
 * Wrapper to register Orval-synced routes to an Express router.
 */
export const registerMdrRoutes = (router: Router, service: IMdrService): void => {
  
  // Sign In
  router.post(getSignInUrl(), validateBody(signInBody), restAPICall('mdr', 'signIn', async (req, res) => {
    try {
      const body = req.body;
      const result = await service.signin(body);
      if (!result) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }
      res.json(result);
    } catch (error) {
      LoggerService.error('Sign-in failed', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }));

  // Get Myself
  router.get(getGetMyselfUrl(), authenticate, restAPICall('mdr', 'getMyself', async (req, res) => {
    try {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const userId = (req as unknown as AuthRequest).user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
      }

      const user = await service.getMyself(userId);
      if (!user) {
        res.status(401).json({ error: 'User not found' });
        return;
      }

      res.json(user);
    } catch (error) {
      LoggerService.error('Myself fetch failed', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }));

  // Sign Out
  router.post(getSignOutUrl(), restAPICall('mdr', 'signOut', async (req, res) => {
    res.status(204).send();
  }));
};
