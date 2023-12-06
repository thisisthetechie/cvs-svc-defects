/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { HTTPError } from "../../../src/models/HTTPError";
import { IvaDefectsService } from "../../../src/services/ivaDefectsService";
import IvaDefects from "../../resources/iva-defects.json";

const mockGetDefectsByManualId = jest.fn();
const mockGetDefectsByCriteria = jest.fn();

describe("IVA Defects Service", () => {
  const ivaDatabaseService = {
    getDefectsByManualId: mockGetDefectsByManualId,
    getDefectsByCriteria: mockGetDefectsByCriteria,
  };
  let target = new IvaDefectsService(ivaDatabaseService as any);

  beforeEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  describe("getIvaDefectsByManualId", () => {
    it("should return unflattened JSON upon successful result", async () => {
      mockGetDefectsByManualId.mockResolvedValueOnce(IvaDefects);

      const result = await target.getIvaDefectsByManualId("M1");

      expect(mockGetDefectsByManualId).toHaveBeenCalledTimes(1);
      expect(result?.length == 1);
    });

    it("should return an empty array upon successfully finding no search results", async () => {
      mockGetDefectsByManualId.mockResolvedValueOnce([]);
      const result = await target.getIvaDefectsByManualId("M1");

      expect(mockGetDefectsByManualId).toHaveBeenCalledTimes(1);
      expect(result?.length == 0);
    });

    it("should throw a 500 http error upon encountering a generic error", async () => {
      mockGetDefectsByManualId.mockRejectedValueOnce(new Error("Fake Error"));
      const actualError = new HTTPError(500, "Internal Server Error");
      expect(async () => {
        await target.getIvaDefectsByManualId("M1");
      }).rejects.toEqual(actualError);
    });
  });

  describe("getIvaDefects", () => {
    it("should return unflattened JSON upon successful result", async () => {
      mockGetDefectsByCriteria.mockResolvedValueOnce(IvaDefects);

      const result = await target.getIvaDefects(null, null, null);

      expect(mockGetDefectsByCriteria).toHaveBeenCalledTimes(1);
      expect(result?.length == 1);
    });

    it("should throw a 500 http error upon encountering a generic error", async () => {
      mockGetDefectsByCriteria.mockRejectedValueOnce(new Error("Fake Error"));
      const actualError = new HTTPError(500, "Internal Server Error");
      expect(async () => {
        await target.getIvaDefects(null, null, null);
      }).rejects.toEqual(actualError);
    });
  });
});