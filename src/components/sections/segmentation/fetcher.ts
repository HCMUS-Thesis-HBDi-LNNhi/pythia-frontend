import { toast } from "components/common";
import API from "const/api.const";
import {
  IBGNBDResponse,
  IRFMResponse,
} from "interfaces/segmentation.interface";
import { fetcher } from "utils/fetcher";

export async function fetchRFMResult(
  id: string,
  setLoading: (value: boolean) => void
): Promise<IRFMResponse | undefined> {
  try {
    setLoading(true);
    const response = await fetcher.get(API.GET.getRFMResult(id));
    if (response.status === 200) return response.data.rfm_result;
    else throw response;
  } catch (error) {
    toast("Something went wrong, please try again!", "failure");
    console.error(error);
  } finally {
    setLoading(false);
  }
}

export async function fetchBGNBDResult(
  id: string,
  setLoading: (value: boolean) => void
): Promise<IBGNBDResponse | undefined> {
  try {
    setLoading(true);
    const response = await fetcher.get(API.GET.getBGNBDResult(id));
    if (response.status === 200) return response.data.bg_nbd_result;
    else throw response;
  } catch (error) {
    toast("Something went wrong, please try again!", "failure");
    console.error(error);
  } finally {
    setLoading(false);
  }
}
